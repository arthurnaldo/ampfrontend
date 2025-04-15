alter table "public"."ai-chats" drop constraint "ai-chats_id_fkey";

alter table "public"."chat-messages" drop constraint "chat-messages_history_id_fkey";

drop function if exists "public"."get_chat_history"(chat_id uuid);

drop function if exists "public"."get_message"(message_id uuid);

alter table "public"."chat-messages" add column "content" text default '''message unknown'''::text;

alter table "public"."chat-messages" disable row level security;

alter table "public"."comments" disable row level security;

alter table "public"."users" disable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_chat_history(p_email text)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_user_id UUID;
  v_chat_id UUID := uuid_generate_v4();
BEGIN
  SELECT id INTO v_user_id
  FROM users
  WHERE email = p_email;
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', p_email;
  END IF;
  
  INSERT INTO "ai-chats" (id, most_recent_visit, messages_id, user_id)
  VALUES (v_chat_id, CURRENT_TIMESTAMP, NULL, v_user_id);
  
  RETURN v_chat_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_message(p_chat_history_id uuid, p_is_user boolean, p_user_id uuid)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_message_id UUID := uuid_generate_v4();
BEGIN
  INSERT INTO "chat-messages" (id, created_at, is_user, user_id, history_id)
  VALUES (v_message_id, CURRENT_TIMESTAMP, p_is_user, p_user_id, p_chat_history_id);
  
  RETURN v_message_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_message(p_chat_history_id uuid, p_is_user boolean, p_user_id uuid, p_message text)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_message_id UUID := uuid_generate_v4();
BEGIN
  INSERT INTO "chat-messages" (id, created_at, is_user, user_id, history_id, content)
  VALUES (v_message_id, CURRENT_TIMESTAMP, p_is_user, p_user_id, p_chat_history_id, p_message);
  
  RETURN v_message_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_chat_history(p_chat_history_id uuid)
 RETURNS TABLE(is_user boolean, message_content text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT cm.is_user, cm.content
  FROM "chat-messages" cm
  WHERE cm.history_id = p_chat_history_id
  ORDER BY cm.created_at ASC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_message(p_message_id uuid)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_content TEXT;
BEGIN
  SELECT content
  INTO v_content
  FROM "chat-messages"
  WHERE id = p_message_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Message with id % not found', p_message_id;
  END IF;
  
  RETURN v_content;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_posts()
 RETURNS TABLE(id uuid, title text, author text, content text, created_at timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT P.id, P.title, U.email, P.content, P.created_at
  FROM "posts" P, "users" U
  WHERE P.author = U.id
  ORDER BY P.created_at DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_chat_history_with_message(p_chat_history_id uuid, p_new_message_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE "ai-chats"
  SET messages_id = p_new_message_id,
      most_recent_visit = CURRENT_TIMESTAMP
  WHERE id = p_chat_history_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_chat_history(user_id uuid)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE 
    new_chat_id UUID;
BEGIN
    INSERT INTO "public"."ai-chats" (user_id) 
    VALUES (user_id) 
    RETURNING id INTO new_chat_id;
    
    RETURN new_chat_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_message(chat_id uuid, user_id uuid, message_text text)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
    new_message_id UUID;
BEGIN
    INSERT INTO "public"."chat-messages" (chat_id, user_id, message_text, created_at)
    VALUES (chat_id, user_id, message_text, NOW()) 
    RETURNING id INTO new_message_id;
    
    RETURN new_message_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_chat_history(chat_id uuid, message_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE "public"."ai-chats" 
    SET last_message_id = message_id 
    WHERE id = chat_id;
END;
$function$
;



create schema if not exists "next_auth";

create table "next_auth"."accounts" (
    "id" uuid not null default uuid_generate_v4(),
    "type" text not null,
    "provider" text not null,
    "providerAccountId" text not null,
    "refresh_token" text,
    "access_token" text,
    "expires_at" bigint,
    "token_type" text,
    "scope" text,
    "id_token" text,
    "session_state" text,
    "oauth_token_secret" text,
    "oauth_token" text,
    "userId" uuid
);


create table "next_auth"."sessions" (
    "id" uuid not null default uuid_generate_v4(),
    "expires" timestamp with time zone not null,
    "sessionToken" text not null,
    "userId" uuid
);


create table "next_auth"."users" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text,
    "email" text,
    "emailVerified" timestamp with time zone,
    "image" text
);


create table "next_auth"."verification_tokens" (
    "identifier" text,
    "token" text not null,
    "expires" timestamp with time zone not null
);


CREATE UNIQUE INDEX accounts_pkey ON next_auth.accounts USING btree (id);

CREATE UNIQUE INDEX email_unique ON next_auth.users USING btree (email);

CREATE UNIQUE INDEX provider_unique ON next_auth.accounts USING btree (provider, "providerAccountId");

CREATE UNIQUE INDEX sessions_pkey ON next_auth.sessions USING btree (id);

CREATE UNIQUE INDEX sessiontoken_unique ON next_auth.sessions USING btree ("sessionToken");

CREATE UNIQUE INDEX token_identifier_unique ON next_auth.verification_tokens USING btree (token, identifier);

CREATE UNIQUE INDEX users_pkey ON next_auth.users USING btree (id);

CREATE UNIQUE INDEX verification_tokens_pkey ON next_auth.verification_tokens USING btree (token);

alter table "next_auth"."accounts" add constraint "accounts_pkey" PRIMARY KEY using index "accounts_pkey";

alter table "next_auth"."sessions" add constraint "sessions_pkey" PRIMARY KEY using index "sessions_pkey";

alter table "next_auth"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "next_auth"."verification_tokens" add constraint "verification_tokens_pkey" PRIMARY KEY using index "verification_tokens_pkey";

alter table "next_auth"."accounts" add constraint "accounts_userid_fkey" FOREIGN KEY ("userId") REFERENCES next_auth.users(id) ON DELETE CASCADE not valid;

alter table "next_auth"."accounts" validate constraint "accounts_userid_fkey";

alter table "next_auth"."accounts" add constraint "provider_unique" UNIQUE using index "provider_unique";

alter table "next_auth"."sessions" add constraint "sessions_userid_fkey" FOREIGN KEY ("userId") REFERENCES next_auth.users(id) ON DELETE CASCADE not valid;

alter table "next_auth"."sessions" validate constraint "sessions_userid_fkey";

alter table "next_auth"."sessions" add constraint "sessiontoken_unique" UNIQUE using index "sessiontoken_unique";

alter table "next_auth"."users" add constraint "email_unique" UNIQUE using index "email_unique";

alter table "next_auth"."verification_tokens" add constraint "token_identifier_unique" UNIQUE using index "token_identifier_unique";

grant delete on table "next_auth"."accounts" to "service_role";

grant insert on table "next_auth"."accounts" to "service_role";

grant references on table "next_auth"."accounts" to "service_role";

grant select on table "next_auth"."accounts" to "service_role";

grant trigger on table "next_auth"."accounts" to "service_role";

grant truncate on table "next_auth"."accounts" to "service_role";

grant update on table "next_auth"."accounts" to "service_role";

grant delete on table "next_auth"."sessions" to "service_role";

grant insert on table "next_auth"."sessions" to "service_role";

grant references on table "next_auth"."sessions" to "service_role";

grant select on table "next_auth"."sessions" to "service_role";

grant trigger on table "next_auth"."sessions" to "service_role";

grant truncate on table "next_auth"."sessions" to "service_role";

grant update on table "next_auth"."sessions" to "service_role";

grant delete on table "next_auth"."users" to "service_role";

grant insert on table "next_auth"."users" to "service_role";

grant references on table "next_auth"."users" to "service_role";

grant select on table "next_auth"."users" to "service_role";

grant trigger on table "next_auth"."users" to "service_role";

grant truncate on table "next_auth"."users" to "service_role";

grant update on table "next_auth"."users" to "service_role";

grant delete on table "next_auth"."verification_tokens" to "service_role";

grant insert on table "next_auth"."verification_tokens" to "service_role";

grant references on table "next_auth"."verification_tokens" to "service_role";

grant select on table "next_auth"."verification_tokens" to "service_role";

grant trigger on table "next_auth"."verification_tokens" to "service_role";

grant truncate on table "next_auth"."verification_tokens" to "service_role";

grant update on table "next_auth"."verification_tokens" to "service_role";


alter table "public"."chat-messages" drop constraint "chat-messages_id_fkey";

alter table "public"."posts" drop constraint "posts_user_id_fkey";

alter table "public"."posts" drop column "likes";

alter table "public"."posts" drop column "user_id";

alter table "public"."posts" add column "author" uuid;

alter table "public"."posts" add column "upvotes" integer default 0;

alter table "public"."posts" disable row level security;

alter table "public"."users" alter column "created_at" drop default;

alter table "public"."chat-messages" add constraint "chat-messages_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "ai-chats"(user_id) not valid;

alter table "public"."chat-messages" validate constraint "chat-messages_user_id_fkey";

alter table "public"."posts" add constraint "posts_author_fkey" FOREIGN KEY (author) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."posts" validate constraint "posts_author_fkey";

set check_function_bodies = off;

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

CREATE OR REPLACE FUNCTION public.get_chat_history(chat_id uuid)
 RETURNS TABLE(message_id uuid, user_id uuid, message_text text, created_at timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY 
    SELECT cm.id, cm.user_id, cm.message_text, cm.created_at
    FROM "public"."chat-messages" cm
    WHERE cm.chat_id = chat_id
    ORDER BY cm.created_at ASC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_message(message_id uuid)
 RETURNS TABLE(chat_id uuid, user_id uuid, message_text text, created_at timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY 
    SELECT cm.chat_id, cm.user_id, cm.message_text, cm.created_at
    FROM "public"."chat-messages" cm
    WHERE cm.id = message_id;
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



-- creating a new chat history
CREATE OR REPLACE FUNCTION create_chat_history(p_email TEXT)
RETURNS UUID AS $$
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
$$ language plpgsql;


-- -- creating a new message
CREATE OR REPLACE FUNCTION create_message(
  p_chat_history_id UUID,
  p_is_user BOOLEAN,
  p_user_id UUID,
  p_message text)
RETURNS UUID AS $$
DECLARE
  v_message_id UUID := uuid_generate_v4();
BEGIN
  INSERT INTO "chat-messages" (id, created_at, is_user, user_id, history_id, content)
  VALUES (v_message_id, CURRENT_TIMESTAMP, p_is_user, p_user_id, p_chat_history_id, p_message);
 
  RETURN v_message_id;
END;
$$ language plpgsql;




-- -- updating the chat history by adding another pointer to a new message in the message list
CREATE OR REPLACE FUNCTION update_chat_history_with_message(
  p_chat_history_id UUID,
  p_new_message_id UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE "ai-chats"
  SET messages_id = p_new_message_id,
      most_recent_visit = CURRENT_TIMESTAMP
  WHERE id = p_chat_history_id;
END;
$$ language plpgsql;


-- reading the chat history from the database
CREATE OR REPLACE FUNCTION get_chat_history(
  p_chat_history_id UUID
)
RETURNS TABLE(is_user BOOLEAN, message_content TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT cm.is_user, cm.content
  FROM "chat-messages" cm
  WHERE cm.history_id = p_chat_history_id
  ORDER BY cm.created_at ASC;
END;
$$ LANGUAGE plpgsql;


-- -- reading an individual message from the database
CREATE OR REPLACE FUNCTION get_message(p_message_id UUID)
RETURNS TEXT AS $$
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
$$ LANGUAGE plpgsql;


-- ***** TO ADD: editing messages, deleting messages, & deleting chat histories, *****


-- ********* create_chat_history TEST **********
-- SELECT create_chat_history('pickleball@berkeley.edu');
-- select * from users where email = 'pickleball@berkeley.edu';


-- select * from "ai-chats"
-- where user_id = '4ff3c884-6fd9-4c81-87ba-4b73e57f0264'


-- select * from "ai-chats" C, "users" U
-- where C.user_id = U.id
-- and U.email = 'pickleball@berkeley.edu';


-- ****** create_message TEST case *******
-- select * from "ai-chats";


-- SELECT create_message( 'cc60adb3-a223-4ff5-8254-0d69a7bd7616', true,
--   '4ff3c884-6fd9-4c81-87ba-4b73e57f0264',
--   'Hello world');


-- select CM.content from "ai-chats" C, "users" U, "chat-messages" CM
-- where C.user_id = U.id
-- and U.email = 'pickleball@berkeley.edu'
-- and CM.history_id = C.id;




-- ****** update_chat_history_with_message TEST case *******
-- SELECT update_chat_history_with_message(
--   'cc60adb3-a223-4ff5-8254-0d69a7bd7616',
--   'acd83889-16f0-45c6-9370-bcda691517e2');


-- ****** get_chat_history TEST case *******
-- SELECT get_chat_history(
--   'cc60adb3-a223-4ff5-8254-0d69a7bd7616'
-- )


-- ****** get_message TEST case *******
-- SELECT get_message(
--   'acd83889-16f0-45c6-9370-bcda691517e2'
-- )


-- SELECT * FROM pg_proc WHERE proname = 'get_message';
-- SELECT * FROM get_message('acd83889-16f0-45c6-9370-bcda691517e2');
-- grant execute on function get_message to anon;


-- reading the posts from the database
-- DROP FUNCTION get_posts();
CREATE OR REPLACE FUNCTION get_posts()
RETURNS TABLE(id uuid, title text, author text, content text, created_at timestamp) AS $$
BEGIN
  RETURN QUERY
  SELECT P.id, P.title, U.email, P.content, P.created_at
  FROM "posts" P, "users" U
  WHERE P.author = U.id
  ORDER BY P.created_at DESC;
END;
$$ LANGUAGE plpgsql;


SELECT * FROM get_posts();


select * from posts;
delete from posts where title in ('test3', 'test4');
commit;
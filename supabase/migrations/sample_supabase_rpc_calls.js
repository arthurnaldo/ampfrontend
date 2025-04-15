async function create_chat_history(email) {
  const { data, error } = await supabase.rpc('create_chat_history', { p_email: email});

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('chat_history_id:', data); // create_chat_history returns chat id
  }
}
create_chat_history('pickleball@berkeley.edu');


async function create_message(chat_id, is_user, user_id, message) {
  const { data, error } = await supabase.rpc("create_message", { 
				p_chat_history_id: chat_id,
  				p_is_user: is_user,
  				p_user_id: user_id,
  				p_message: message
		});
    
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('message_id:', data); // create_message returns message id
  }
}
create_message(chat_id, is_user, user_id, "Welcome! How can I assist you today?" );
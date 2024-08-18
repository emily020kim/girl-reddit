const BASE_URL = "http://localhost:3000/api";

function getHeaders() {
  const headers = {'Content-Type': 'application/json'};
  const currentToken = localStorage.getItem('user-token');
  if (currentToken !== null) {
    headers['Authorization'] = 'Bearer ' + currentToken;
  };
  return headers;
};

// Admin and user register/login routes
export async function adminLogin(username, password, secret) {
  const sendData = {
    admin: {username: username, password: password, secret: secret}
  };

  try {
    const response = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(sendData)
    });
    const result = await response.json();
    const token = result.data.token;
    localStorage.setItem('admin-token', token);
    localStorage.setItem('username', username);
    return result;
  } catch (error) {
    console.error('Count not login', error);
  }
};

export async function registerUser(username, password) {
  const sendData = {
    user: {username: username, password: password},
  };

  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(sendData)
    });
    const result = await response.json();
    const token = result.data.token;
    localStorage.setItem('user-token', token);
    localStorage.setItem('username', username);
    return result;
  } catch (error) {
    console.error('Could not register', error);
  };
};

export async function userLogin(username, password) {
  const sendData = {
    username: username,
    password: password
  };

  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(sendData)
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const result = await response.json();
    console.log("result: ", result);

    const token = result.token;
    localStorage.setItem('user-token', token);
    localStorage.setItem('username', username);

    return result;
  } catch (error) {
    console.error('Could not login', error);
    return { error: error.message };
  };
};

// Fetch all routes
export async function fetchAllUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Trouble fetching users!', error);
  };
};

export async function fetchAllThreads() {
  try {
    const response = await fetch(`${BASE_URL}/threads`, {
      headers: getHeaders(),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble fetching threads!', error);
  };
};

export async function fetchAllReplies() {
  try {
    const response = await fetch(`${BASE_URL}/replies`, {
      headers: getHeaders(),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble fetching replies!', error);
  };
};

// Fetch by id
export async function fetchSingleUser() {
  try {
    const response = await fetch(`${BASE_URL}/users/:id`, {
      headers: getHeaders(),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Uh oh, trouble fetching single user", error);
  };
};

export async function fetchSingleThread(threadId) {
  try {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`, {
      headers: getHeaders(),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble fetching the thread!', error);
  };
};

export async function fetchSingleReply(replyId) {
  try {
    const response = await fetch(`${BASE_URL}/replies/${replyId}`, {
      headers: getHeaders(),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble fetching the reply!', error);
  };
};

// POST routes
export async function createThread(user_id, title, content, date) {
  const sendData = {
    website: {user_id: user_id, title: title, content: content, date: date}
  };

  try {
    const response = await fetch(`${BASE_URL}/threads`, {
      headers: getHeaders(),
      method: 'POST',
      body: JSON.stringify(sendData)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble creating thread!', error);
  };
};

export async function createReply(content) {
  const sendData = {
    website: {content: content}
  };

  try {
    const response = await fetch(`${BASE_URL}/replies`, {
      headers: getHeaders(),
      method: 'POST',
      body: JSON.stringify(sendData)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble creating reply!', error);
  };
};

// PATCH routes
export async function editThread(id, user_id, title, content, date) {
  const sendData = {
    website: {id: id, user_id: user_id, title: title, content: content, date: date},
  };

  try {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`, {
      method: 'PATCH', 
      headers: getHeaders(),
      body: JSON.stringify(sendData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Could not edit thread', error);
  };
};

export async function editReply(id, user_id, thread_id, content, date) {
  const sendData = {
    website: {id: id, user_id: user_id, thread_id: thread_id, content: content, date: date},
  };

  try {
    const response = await fetch(`${BASE_URL}/replies/${replyId}`, {
      method: 'PATCH', 
      headers: getHeaders(),
      body: JSON.stringify(sendData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Could not edit reply', error);
  };
};

// DELETE routes
export async function deleteThread(threadId) {
  try {
    const response = await fetch (`$BASE_URL}/reviews/${threadId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error ('Could not delete thread', error);
  };
};

export async function deleteReply(replyId) {
  try {
    const response = await fetch (`$BASE_URL}/reviews/${replyId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error ('Could not delete reply', error);
  };
};
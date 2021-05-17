import request from 'superagent';

export async function signUp(credentials) {
  const response = await request
    .post('/api/auth/signup')
    .ok(res => res.status < 500)
    .send(credentials);


  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}


export async function logIn(credentials) {
  const response = await request
    .post('/api/auth/login')
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}


export async function addTodo(todo) {
  const response = await request
    .post('/api/todos')
    .set('Authorization', window.localStorage.getitem('TOKEN'))
    .send(todo);

  return response.body;
}

export async function getTodo() {
  const response = await request
    .get('api/me/todos')
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function deleteTodo(id) {
  const response = await request
    .delete(`/api/todos/${id}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function completeTodo(id) {
  const response = await request
    .post(`/api/todos/${id}/completed`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}
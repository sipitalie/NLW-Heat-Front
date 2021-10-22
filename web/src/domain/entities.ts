export type User={
  id: string
  name: string,
  github_id: number,
  avatar_url: string,
  login: string
}
export type Message={
  id: string,
  text: string,
  created_at: string,
  user_id: string,
  user: User
      
}
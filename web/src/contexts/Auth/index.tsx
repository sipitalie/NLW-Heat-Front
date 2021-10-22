import { 
  createContext,
  ReactNode, 
  useEffect,
  useState 
} from "react";
import {User} from '../../domain/entities';
import { api } from '../../services/Api';

type AuthProvider={
  children:ReactNode;
}
type AuthContextData={
  user: User | null;
  signInUrl: string;
  signOut: ()=>void;
}
type AuthResponse={
  token: string;
  user: User;
}
export const AuthContext =createContext({} as AuthContextData);

export function AuthProvider({children}:AuthProvider){
  const [user, setUser] =useState<User | null>(null)
  const signInUrl=`https://github.com/login/oauth/authorize?scope=user&client_id=601a58f4fe09c489346b`;

  async function signIn(code:string){
    const {data} = await api.post<AuthResponse>('authenticate',{code})
    const {token, user} = data;
    localStorage.setItem("@doWhile:token",token);
    api.defaults.headers.common.authorization = `bearer ${token}`
    setUser(user);
  }
  function signOut(){
    setUser(null)
    localStorage.removeItem("@doWhile:token")

  }
  useEffect(()=>{
    const token= localStorage.getItem("@doWhile:token")
    if(token){
      api.defaults.headers.common.authorization = `bearer ${token}`
      api.get<User>('profile').then(res=>setUser(res.data))
    }
  },[])
  useEffect(()=>{
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')
    if(hasGithubCode){
      const [urlWithOutCode, githubCode]=url.split('?code=');
      window.history.pushState({},'',urlWithOutCode);
      signIn(githubCode);

    }
  },[])
  return(
    <AuthContext.Provider value ={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
};
import { useContext, useState, FormEvent } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/Auth';
import { api } from '../../services/Api';
import styles from './styles.module.scss';

export function SendMessageForm(){
  const {user,signOut} = useContext(AuthContext)
  const [message, setMessage]=useState('');
  async function handlerSendMessage(event:FormEvent){
    event.preventDefault();
    if(!message.trim()){
      return;
    }
    await api.post('messages',{message})
    setMessage('')
  }
  return(
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={()=>signOut()}>
        <VscSignOut size='32'/>
      </button>
      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name}/>
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size='16'/>
          {user?.login}
        </span>
      </header>
      <form onSubmit={handlerSendMessage} className={styles.sendMessageForm}>
        <label htmlFor='message'>Mensagem</label>
        <textarea
          name='message'
          id='message'
          placeholder='Qual é a sua expectativa para o evento?'
          onChange={event=>setMessage(event.target.value)}
          value={message}
        />
        <button type='submit'>Enviar mensagem</button>
      </form>
    </div>
  )
}
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth } from "../../services/firebase";

import CartCounter from "../CartCounter/CartCounter";

import { useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import Logo from "../../assets/logo-fruit.png";
//import { GoogleLogo, Timer } from "phosphor-react";

import styles from "./header.module.scss";
import { ButtonGoogle } from "../ButtonGoogle/ButtonGoogle";

const Header = () => {  
    const [user, setUser] = useState<User>({} as User);
  
   function handleGoogleSignin(){
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
      .then(result => {
        setUser(result.user);
        // salvar os dados no localStorage
        localStorage.setItem("user", JSON.stringify(result.user)!);
        localStorage.setItem("userName", JSON.stringify(result.user.displayName)!);
        localStorage.setItem("userEmail", JSON.stringify(result.user.email)!);
        
        toast.success("Bem vindo " + result.user.displayName);
               
      })
      .catch(error => {
        console.log(error);
      }
      );
    }   

  // busca informações do usuário no localStorage e exibe em tela
  const userData = JSON.parse(localStorage.getItem("user")!);
  const userName = JSON.parse(localStorage.getItem("userName")!);
  const userEmail = JSON.parse(localStorage.getItem("userEmail")!);
  
  //desconectar do google
  function handleGoogleSignout(){
    auth.signOut()
    .then(() => {
      setUser({} as User);
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    toast.success("Você saiu do sistema");
// refresh no localStorage
    localStorage.clear();

    })
    .catch(error => {
      console.log(error);
    }
    );  
  }
  
  return (
    <>
      <header className={styles.header}>
      <div className={styles.HeaderConternt}>
        <Link to="/">
          <img className={styles.imglogo} src={Logo} alt="logo do fruitfast" />
        </Link>     
        <div className={styles.Connect}>
          <div className={styles.ConnectContent}>
            {//renderização condicional para exibir ou não o botão de conexão com o google
            }
            {userData ? (
              <>
              <div className={styles.UserInfo}>           
                    <p>Bem Vindo (a): <span>{userName}</span></p>
                    <small>{userEmail}</small>
                    <p>
                        <button
                        onClick={handleGoogleSignout}
                        > Sair
                      </button>
                    </p>
                </div>               
              </>
            ) : (
              <>
                <ButtonGoogle
                handleGoogleSignin={handleGoogleSignin} />
              </>
            )}                 
          </div>          
        </div>
        <Link to={"/cart"}>
          <CartCounter /> {/* Component Cart*/}
        </Link>
      </div>
      </header>
    </>
  );
};

export default Header;

import { GoogleLogo } from "phosphor-react";


import styles from "./button.module.scss";

export function ButtonGoogle(props : any) {

  return (
    <>
      <button className={styles.GoogleButton}
                onClick={props.handleGoogleSignin}>
      
                <GoogleLogo /> Entrar com o Google
        </button>
    </>
  );
}



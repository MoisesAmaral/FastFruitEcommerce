import styles from './footer.module.scss'

export function Footer() {
  return (
    <footer>
      <div className={styles.Footer}>         
            <h3>@2022 FruitFast - Todos os direitos reservados. <span>by: MoisesDev</span> <p>for: Lider Aviação</p> </h3> 
        </div>
    </footer>
  );
}
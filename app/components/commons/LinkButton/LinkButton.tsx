import Link from "next/link";
import styles from "./LinkButton.module.scss";

const LinkButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link href={href}>
      <button className={styles.button}>{text}</button>
    </Link>
  );
};

export default LinkButton;

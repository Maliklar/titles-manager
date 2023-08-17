"use client";
import Logo from "@/assets/images/icon.webp";
import Image from "next/image";
import styles from "./index.module.scss";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const Navigation = () => {
  // States for UI behavior (drawer on small screens and Hide nav when scrolling)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hide, setHide] = useState(false);

  //   Hide navigation when scrolling
  useEffect(() => {
    let lastPosition = 0;
    function scrollHandler() {
      if (lastPosition > scrollY) setHide(false);
      else if (scrollY > 100) setHide(true);
      lastPosition = scrollY;
    }
    document.addEventListener("scroll", scrollHandler);

    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);

  const openMenuHandler = () => setIsMenuOpen(true);
  const closeMenuHandler = () => setIsMenuOpen(false);

  return (
    <header className={`${styles.container} bg-gray-800`} data-hide={hide}>
      <Link href="/" className={styles.logo} title="Website Title">
        <Image
          src={Logo.src}
          style={{
            objectFit: "contain",
          }}
          height={40}
          width={40}
          priority
          alt="Website Title"
        />
        <h1>Website Title</h1>
      </Link>

      <nav className={styles.nav}>
        <Links />
      </nav>

      <button
        className={styles.hamburgerButton}
        title="Open Menu"
        onClick={openMenuHandler}
      >
        <AiOutlineMenu fontSize="1.5rem" />
      </button>

      <aside className={styles.sideMenu} data-open={isMenuOpen}>
        <Links showLogo />
        <button
          className={styles.closeButton}
          title="Close Menu"
          onClick={closeMenuHandler}
        >
          <AiOutlineClose fontSize="2rem" />
        </button>
      </aside>
    </header>
  );
};
export default Navigation;

type Props = {
  showLogo?: boolean;
};

const Links = ({ showLogo = false }: Props) => {
  return (
    <ul className={styles.ul}>
      {showLogo && (
        <li className={styles.li}>
          <Link href="#">
            <Image
              src={Logo.src}
              style={{
                objectFit: "contain",
              }}
              height={50}
              width={50}
              priority
              alt="Website Title"
            />
          </Link>
        </li>
      )}
      <li className={styles.li}>
        <Link href="#">Programs</Link>
      </li>
      <li className={styles.li}>
        <Link href="#">Services</Link>
      </li>
      <li className={styles.li}>
        <Link href="#">News</Link>
      </li>
      <li className={styles.li}>
        <Link href="#">About Us</Link>
      </li>
    </ul>
  );
};

import styles from "./Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>ArtNode</h1>
        <p className={styles.tagline}>The next generation of on-chain art</p>
      </header>

      <main className={styles.main}>
        <section className={styles.description}>
          <h2>ArtNode: Concept and Vision</h2>
          <p>
            At the forefront of digital art innovation, ArtNode redefines
            on-chain NFTs creation and rendering, empowering creators,
            developers and artists with simplicity and security.
          </p>
        </section>

        <section className={styles.section}>
          {/* ... content */}

          {/* Adding the Link */}
          <Link href="/tinydinos"  style={{
              color: '#0070f3', // Link-like blue color
              cursor: 'pointer', // Changes cursor to indicate clickable
              textDecoration: 'underline' // Underline like a traditional link
            }}>Tiny Dinos on the blockchain</Link>
        </section>

        {/* <section className={styles.section}>
          <h2>Technical Innovations</h2>
          <p>
            ArtNode blends SVG-based rendering with dynamic JavaScript handling
            of NFT traits, ensuring high-quality, efficient digital art on the
            blockchain.
          </p>
        </section>

        <section className={styles.section}>
          <h2>User and Developer Experience</h2>
          <p>
            Balancing functionality and simplicity, ArtNode offers an enriching
            NFT creation and discovery experience, fostering ease of use and
            artistic expression.
          </p>
        </section> */}
      </main>
    </div>
  );
}

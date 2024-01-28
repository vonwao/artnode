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
          <h2>Concept and Vision</h2>
          <p>
            "ArtNode represents a breakthrough in blockchain-based digital art,
            blending Ethereum's robust technology with the flexibility of
            JavaScript. It uniquely enables storing JavaScript code on-chain in
            a gas-efficient and verifiable way, vastly reducing the costs and
            complexities associated with traditional Solidity-based approaches.
            This opens up new creative and economic avenues for artists and
            developers alike.
          </p>
          <p>
            At the heart of ArtNode's innovation is its use of Ethereum
            calldata, offering significant cost savings and efficiency over
            standard storage methods. The protocol comprises a unique blend of
            art/JavaScript storage, off & on-chain code verification, and
            off-chain rendering, positioning it as a versatile tool for a wide
            range of NFT and digital art projects.
          </p>
          <p>
            What sets ArtNode apart is its ability to democratize blockchain art
            creation. By leveraging JavaScript, it lowers the entry barrier,
            inviting a broader community of creators. This is exemplified in our
            Tiny Meta collection, which demonstrates ArtNode's capability to
            facilitate fully on-chain, unique art projects.
          </p>
          <p>
            ArtNode is not just a technological solution; it's a platform that
            bridges the gap between technical complexity and creative expression
            in the blockchain space. With its user-friendly web interface, it
            promises to unlock the untapped potential of digital art on the
            blockchain, making it an attractive proposition for investors
            looking to capitalize on the burgeoning NFT and digital art market."
          </p>
        </section>

        <section className={styles.section}>
          {/* ... content */}

          {/* Adding the Link */}
          <Link
            href="/tinydinos"
            style={{
              color: "#0070f3", // Link-like blue color
              cursor: "pointer", // Changes cursor to indicate clickable
              textDecoration: "underline", // Underline like a traditional link
            }}
          >
            Demo of Tiny Dinos NFTs
          </Link>
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

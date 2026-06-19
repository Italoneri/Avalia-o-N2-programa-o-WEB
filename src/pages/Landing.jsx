import { Link } from "react-router-dom";

const LARANJA = "rgb(235, 167, 104)";

const adocoes = [
  {
    emoji: "🐶",
    titulo: "Salve uma vida",
    texto: "Milhares de animais aguardam um lar. Ao adotar, você dá uma segunda chance a quem mais precisa.",
  },
  {
    emoji: "🏡",
    titulo: "Ganhe um amigo fiel",
    texto: "Animais adotados criam laços incríveis com seus tutores. Amor incondicional garantido.",
  },
  {
    emoji: "💛",
    titulo: "Combata o abandono",
    texto: "Cada adoção consciente reduz o número de animais nas ruas e nos abrigos.",
  },
];

const pets = [
  {
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
    nome: "Rex",
    descricao: "Golden Retriever, 2 anos, brincalhão e cheio de energia.",
  },
  {
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
    nome: "Mia",
    descricao: "Gata laranja, 1 ano, carinhosa e independente.",
  },
  {
    img: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=300&fit=crop",
    nome: "Bolinha",
    descricao: "Vira-lata caramelo, 3 anos, dócil e vacinado.",
  },
];

const depoimentos = [
  {
    texto: "Adotar o Thor mudou minha vida. Ele me acompanha em tudo e alegra meus dias!",
    autor: "— Mariana S.",
  },
  {
    texto: "Nunca pensei que um gatinho pudesse fazer tanta diferença em casa. Recomendo demais!",
    autor: "— Carlos R.",
  },
  {
    texto: "O processo foi simples e a equipe da Pet&Co. nos ajudou em tudo. Adoramos a Nala!",
    autor: "— Família Oliveira",
  },
];

export default function Landing() {
  return (
    <div style={{ overflowX: "hidden" }}>

      {/* HEADER */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ textDecoration: "none" }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            backgroundColor: LARANJA,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.3rem", marginRight: 8,
          }}>🐾</div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: LARANJA }}>Pet&amp;Co.</div>
            <div style={{ fontSize: "0.62rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.3px" }}>Adoção responsável</div>
          </div>
        </Link>

        <div className="ml-auto d-flex" style={{ gap: 10 }}>
          <Link to="/login" className="btn" style={{
            border: `2px solid ${LARANJA}`, color: LARANJA,
            borderRadius: 24, padding: "6px 22px", fontWeight: 600,
          }}>
            Entrar
          </Link>
          <Link to="/cadastro" className="btn" style={{
            backgroundColor: LARANJA, color: "#fff",
            borderRadius: 24, padding: "6px 22px", fontWeight: 600,
            border: "2px solid transparent",
          }}>
            Cadastrar
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: `linear-gradient(135deg, #fff8f0 0%, #ffecd8 100%)`,
        padding: "80px 20px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span style={{
            backgroundColor: "#fde8cc", color: LARANJA,
            borderRadius: 20, padding: "4px 16px", fontSize: "0.85rem", fontWeight: 600,
          }}>
            🐾 Adoção responsável
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, marginTop: 20, color: "#2d2d2d", lineHeight: 1.2 }}>
            Encontre seu novo<br />
            <span style={{ color: LARANJA }}>melhor amigo</span>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#666", marginTop: 16, lineHeight: 1.7 }}>
            Na Pet&amp;Co. conectamos animais que precisam de amor com famílias que têm amor para dar.
            Adote, transforme uma vida — e a sua também.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/cadastro" className="btn" style={{
              backgroundColor: LARANJA, color: "#fff", borderRadius: 30,
              padding: "12px 32px", fontSize: "1rem", fontWeight: 700,
              boxShadow: "0 4px 15px rgba(235,167,104,0.4)",
            }}>
              Quero adotar agora
            </Link>
            <a href="#como-funciona" className="btn" style={{
              border: `2px solid ${LARANJA}`, color: LARANJA, borderRadius: 30,
              padding: "12px 32px", fontSize: "1rem", fontWeight: 700,
            }}>
              Saiba mais
            </a>
          </div>
        </div>

        {/* hero image */}
        <div style={{ marginTop: 56, borderRadius: 24, overflow: "hidden", maxWidth: 900, margin: "56px auto 0", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
          <img
            src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=900&h=420&fit=crop"
            alt="Pessoa feliz com seu pet"
            style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }}
          />
        </div>
      </section>

      {/* MOTIVOS */}
      <section id="como-funciona" style={{ padding: "72px 20px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontWeight: 800, fontSize: "2rem", color: "#2d2d2d", marginBottom: 8 }}>
            Por que adotar?
          </h2>
          <p style={{ textAlign: "center", color: "#888", marginBottom: 48 }}>
            Adotar é um ato de amor que transforma duas vidas ao mesmo tempo.
          </p>
          <div className="row">
            {adocoes.map((item) => (
              <div className="col-md-4 mb-4" key={item.titulo}>
                <div style={{
                  backgroundColor: "#fff8f0", borderRadius: 20, padding: "36px 28px",
                  textAlign: "center", height: "100%",
                  boxShadow: "0 4px 20px rgba(235,167,104,0.1)",
                  transition: "transform 0.2s",
                }}>
                  <div style={{ fontSize: "3rem", marginBottom: 16 }}>{item.emoji}</div>
                  <h5 style={{ fontWeight: 700, color: "#2d2d2d", marginBottom: 10 }}>{item.titulo}</h5>
                  <p style={{ color: "#666", lineHeight: 1.6, margin: 0 }}>{item.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PETS DISPONÍVEIS */}
      <section style={{ padding: "72px 20px", backgroundColor: "#fafafa" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontWeight: 800, fontSize: "2rem", color: "#2d2d2d", marginBottom: 8 }}>
            Pets esperando por você
          </h2>
          <p style={{ textAlign: "center", color: "#888", marginBottom: 48 }}>
            Conheça alguns dos nossos amiguinhos disponíveis para adoção.
          </p>
          <div className="row">
            {pets.map((pet) => (
              <div className="col-md-4 mb-4" key={pet.nome}>
                <div style={{
                  borderRadius: 20, overflow: "hidden", backgroundColor: "#fff",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)", height: "100%",
                }}>
                  <img src={pet.img} alt={pet.nome} style={{ width: "100%", height: 220, objectFit: "cover" }} />
                  <div style={{ padding: "20px 24px 28px" }}>
                    <h5 style={{ fontWeight: 700, color: "#2d2d2d", marginBottom: 6 }}>{pet.nome}</h5>
                    <p style={{ color: "#777", margin: 0, lineHeight: 1.6 }}>{pet.descricao}</p>
                    <Link to="/cadastro" style={{
                      display: "inline-block", marginTop: 16,
                      backgroundColor: LARANJA, color: "#fff",
                      borderRadius: 20, padding: "6px 20px", fontSize: "0.85rem", fontWeight: 600,
                      textDecoration: "none",
                    }}>
                      Quero adotar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section style={{ padding: "72px 20px", background: `linear-gradient(135deg, #fff8f0 0%, #ffecd8 100%)` }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontWeight: 800, fontSize: "2rem", color: "#2d2d2d", marginBottom: 8 }}>
            Histórias que aquecem o coração
          </h2>
          <p style={{ textAlign: "center", color: "#888", marginBottom: 48 }}>
            Quem adota, nunca se arrepende.
          </p>
          <div className="row">
            {depoimentos.map((d) => (
              <div className="col-md-4 mb-4" key={d.autor}>
                <div style={{
                  backgroundColor: "#fff", borderRadius: 20, padding: "32px 28px", height: "100%",
                  boxShadow: "0 4px 20px rgba(235,167,104,0.12)",
                }}>
                  <p style={{ fontSize: "1.3rem", color: LARANJA, marginBottom: 12, lineHeight: 1 }}>"</p>
                  <p style={{ color: "#555", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>{d.texto}</p>
                  <p style={{ marginTop: 20, fontWeight: 700, color: "#2d2d2d", marginBottom: 0 }}>{d.autor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "80px 20px", backgroundColor: LARANJA, textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "2rem", marginBottom: 12 }}>
          Pronto para mudar uma vida?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", marginBottom: 32 }}>
          Cadastre-se agora e encontre o pet perfeito para a sua família.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/cadastro" className="btn" style={{
            backgroundColor: "#fff", color: LARANJA,
            borderRadius: 30, padding: "12px 36px", fontWeight: 700, fontSize: "1rem",
          }}>
            Criar conta grátis
          </Link>
          <Link to="/login" className="btn" style={{
            border: "2px solid #fff", color: "#fff",
            borderRadius: 30, padding: "12px 36px", fontWeight: 700, fontSize: "1rem",
          }}>
            Já tenho conta
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#2d2d2d", padding: "28px 20px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", backgroundColor: LARANJA,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem",
          }}>🐾</div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>Pet&amp;Co.</span>
        </div>
        <p style={{ color: "#888", margin: 0, fontSize: "0.85rem" }}>
          © 2025 Pet&amp;Co. — Adoção responsável que transforma vidas.
        </p>
      </footer>

    </div>
  );
}

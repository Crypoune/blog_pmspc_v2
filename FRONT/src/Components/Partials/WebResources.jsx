const WebRessources = () => {
  const sites = [
    {
      name: "GT Créa Cars",
      url: "https://gtcreacars.com/",
      logo: "/src/assets/img/logo/gt_crea_cars.webp",
      description: "Jantes, enjoliveurs et pièces custom pour modèles LEGO.",
    },
    {
      name: "Matts Brick Mocs",
      url: "https://www.mattsbrickmocs.com/",
      logo: "/src/assets/img/logo/mattsbrickmocs.webp",
      description: "Stickers personnalisés pour modèles LEGO.",
    },
    {
      name: "Chrome Block City",
      url: "https://chromeblockcity.com/",
      logo: "/src/assets/img/logo/chrome_block_city.webp",
      description: "Pièces LEGO chromées en différentes couleurs.",
    },
    {
      name: "Rebrickable",
      url: "https://rebrickable.com/home/",
      logo: "/src/assets/img/logo/rebrickable.webp",
      description: "Instructions de montage et infos sur les LEGO.",
    },
    {
      name: "Lego",
      url: "https://www.lego.com/fr-fr",
      logo: "/src/assets/img/logo/lego.webp",
      description: "Le site officiel LEGO... Je peux me tromper ceci dit.",
    },
    {
      name: "Bricklink",
      url: "https://www.bricklink.com/",
      logo: "/src/assets/img/logo/bricklink.webp",
      description: "Achat de pièces LEGO à l’unité, partout dans le monde.",
    },
    {
      name: "Webrick",
      url: "https://www.webrick.com/",
      logo: "/src/assets/img/logo/webrick.webp",
      description: "Pièces compatibles LEGO, dispo en couleurs variées.",
    },
  ];

  return (
    <section>
      <h1>Liens utiles</h1>
      <div className="resources-grid">
        {sites.map((site, index) => (
          <div className="resource-card" key={String(index)}>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card-content"
            >
              <img
                src={site.logo}
                alt={`${site.name} logo`}
                className="resource-logo"
              />
              <div className="resource-text">
                <h3>{site.name}</h3>
                <p>{site.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WebRessources;

import { fetchAPI } from "../utils/fetchAPI";
const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const asa = await fetchAPI("asset", `${process.env.ASA}`);
  const asaId = asa.map((asa_id) => `${asa_id.asset_1_id}`,
  )
  const baseUrl = {
    development: "http://localhost:3000",
    production: `${process.env.BASE_URL}`,
  }[process.env.NODE_ENV];


  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${asaId
        .map((url) => {
          return `
            <url>
              <loc>${baseUrl}asa/${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;

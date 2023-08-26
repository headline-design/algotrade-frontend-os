export const pageview = (url) => {
  window.gtag("config", `${process.env.gtag_tracking_id}`, {
    page_path: url,
  });
};

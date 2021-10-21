module.exports = ({ env }) => ({
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: env("CLOUDINARY_NAME", "dtd8ranav"),
      api_key: env("CLOUDINARY_KEY", "634934344466693"),
      api_secret: env("CLOUDINARY_SECRET", "sVx3uh3nORRaBi44hm5RZQTRVi0"),
    },
  },
});

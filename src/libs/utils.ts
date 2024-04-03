

export const getLanguageBasedOnLocale = (locale: string) => {
    if (["en", "de", "fr", "it", "nl", "es"].includes(locale)) {
      return {
        en: "en-GB",
        de: "de-CH",
        fr: "fr-CH",
        it: "it-IT",
        nl: "nl-BE",
        es: "es-ES",
      }[locale];
    }
    return "en-us";
  };

  export const addPrismicPreviewHeaders = (previewData: any) => {
    const ref = previewData?.ref;
    return ref
      ? {
          context: {
            headers: {
              "Prismic-ref": ref,
            },
          },
        }
      : {};
  };
  
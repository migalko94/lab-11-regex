const PATRON_IMG = /<img(\s)?src="(?<url>(\w|:|\.|\/|-){0,})"\s\/>/gm;

export const extraeUrlPatrones = (valor: string) => {
  const arrayUrls = [];
  let coincidencia = PATRON_IMG.exec(valor);
  while ((coincidencia = PATRON_IMG.exec(valor))) {
    const { url } = coincidencia.groups as any;
    arrayUrls.push(url);
  }
  return arrayUrls;
};

const baseURL = "https://api.unsplash.com/";
const API_KEY = process.env.REACT_APP_API_KEY;

export const getImages = async () => {
  const queryParams = "photos?per_page=50";

  try {
    const res = await fetch(`${baseURL}/${queryParams}`, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    });
    return {
      data: await res.json(),
      error: null,
    };
  } catch (e) {
    return { data: null, error: e };
  }
};

export const searchImages = async (search) => {
  const queryParams = `search/photos?per_page=50&query=${search}`;

  try {
    const res = await fetch(`${baseURL}/${queryParams}`, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    });
    const data = await res.json();
    return {
      data: data.results,
      error: null,
    };
  } catch (e) {
    return { data: null, error: e };
  }
};

import axios from "axios";
import getEnv from "./env";

const {
  SPOTIFY_API: { TOP_TRACKS_API, ALBUM_TRACK_API_GETTER },
} = getEnv();

const ERROR_ALERT = new Error(
  "Oh no! Something went wrong; probably a malformed request or a network error.\nCheck console for more details."
);

const formatter = (data) =>
  data.map((val) => {
    const artists = val.artists?.map((artist) => ({ name: artist.name })); // Checks if properly exisits in the dataset
    return {
      songTitle: val.name,
      songArtists: artists,
      albumName: val.album?.name,
      imageUrl: val.album?.images[0]?.url ?? undefined,
      duration: val.duration_ms,
      externalUrl: val.external_urls?.spotify ?? undefined,
      previewUrl: val.preview_url ?? undefined,
    };
  });

/* Fetches data from the given endpoint URL with the access token provided. */
const fetcher = async (url, token) => {
  try {
    return await axios(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// /* Fetches your top tracks from the Spotify API.
//  * Make sure that TOP_TRACKS_API is set correctly in env.js */

export const getMyTopTracks = async (
  token,
  offset = 0,
  limit = 20,
  timeRange = "medium_term"
) => {
  try {
    const url = `https://api.spotify.com/v1/me/top/tracks?offset=${offset}&limit=${limit}&time_range=${timeRange}`;
    const res = await fetcher(url, token);
    return formatter(res.data?.items || []); // Ensures an empty array if no items
  } catch (e) {
    console.error(e);
    alert(ERROR_ALERT);
    return null;
  }
};

/* Fetches the given album from the Spotify API.
 * Make sure that ALBUM_TRACK_API_GETTER is set correctly in env.js */
export const getAlbumTracks = async (albumId, token) => {
  try {
    // Transforms the response to extract relevant information from each track in the album.
    // Maps through each track item in the response and assigns album images and album name to each track item.
    const res = await fetcher(ALBUM_TRACK_API_GETTER(albumId), token);
    const transformedResponse = res.data?.tracks?.items?.map((item) => {
      item.album = { images: res.data?.images, name: res.data?.name };
      return item;
    });
    return formatter(transformedResponse);
  } catch (e) {
    console.error(e);
    alert(ERROR_ALERT);
    return null;
  }
};

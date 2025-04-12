import HomePage from "../pages/HomePage";
import PersonDetail from "../pages/PersonDetail";
import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";


export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "password-update",
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/person/:personId",
    element: <PersonDetail />,
    state: "person.detail",
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search",
  },
  {
    path: "/:mediaType",
    element: <MediaList />,
    state: "media.list",
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />,
    state: "media.detail",
  },
];

export default routes;

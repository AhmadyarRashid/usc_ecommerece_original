import {
  useFocusEffect,
  getFocusedRouteNameFromRoute,
  useRoute,
} from "@react-navigation/native";
import { RefObject } from "react";

import { tabBarRef } from "../navigation/AppBottomTab";
import { tabHiddenRoutes } from "../constants/misc";

interface TabBarRef {
  current: {
    setVisible: (visible: boolean) => void;
  } | null;
}

const useTabBarVisibility = () => {
  const route = useRoute<any>()

  useFocusEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName && tabHiddenRoutes.includes(routeName)) {
      if (tabBarRef.current) {
        tabBarRef.current.setVisible(false);
      }
    } else {
      if (tabBarRef.current) {
        tabBarRef.current.setVisible(true);
      }
    }
  });
};

export default useTabBarVisibility;

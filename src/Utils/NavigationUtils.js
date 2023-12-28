import { useNavigation } from "@react-navigation/native";

export function navigateGoBack() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return handleGoBack;
}

export function navigateToScreen(screenName, params = {}) {
  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate(screenName, params);
  };

  return navigate;
}

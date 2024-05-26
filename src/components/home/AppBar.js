import * as React from "react";
import { AppBar, Button, Box, Toolbar, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

export default function ButtonAppBar() {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = React.useState("en");

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ua" : "en";
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t("AppBar.title")}
          </Typography>
          <Button color="inherit" onClick={toggleLanguage}>
            <LanguageIcon />
            {currentLanguage === "en" ? "EN" : "UA"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

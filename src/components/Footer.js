// react
import React from "react";
// MUI
import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
// icons
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import FooterLink from "../atoms/FooterLink";

function Footer() {
  return (
    <Box sx={{ backgroundColor: "neutral.main", py: 2 }}>
      <Container>
        <Stack>
          <Stack direction="row" justifyContent="center" pb={2} pt={3}>
            <FooterLink
              href={"https://www.linkedin.com/in/ali-sher-khan-1331a8205/"}
            >
              <FaLinkedin size="20px" />
            </FooterLink>
            <FooterLink href="https://discordapp.com/users/Metaxa#5113">
              <FaDiscord size="20px" />
            </FooterLink>
            <FooterLink href="https://github.com/alisherkhan98">
              <FaGithub size="20px" />
            </FooterLink>
            <FooterLink href="https://twitter.com/AliSher03212351">
              <FaTwitter size="20px" />
            </FooterLink>
          </Stack>
          <Divider sx={{ color: "neutral.main" }} />
          <Typography color="text.secondary" textAlign="center" p={2}>
            © 2022 - Ali Sher Khan
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;

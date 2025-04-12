import { Paper, Stack, Box, Typography, IconButton } from "@mui/material";
import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import { Facebook, Twitter, Instagram, GitHub } from "@mui/icons-material"; // Import social media icons

const Footer = () => {
  return (
    <Container>
      <Paper
        square={true}
        sx={{
          backgroundImage: "unset",
          padding: "2rem",
        }}
      >
        <Stack
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
          sx={{ height: "max-content" }}
        >
          {/* Top Section */}
          <Box>
            <Logo />
            <Typography
              variant="body2"
              sx={{
                marginTop: "1rem",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              Your Ultimate Destination for Movies & Entertainment!" 🍿🎬
            </Typography>
          </Box>

          {/* Social Media Icons */}
          <Box>
            <Stack direction="row" spacing={2}>
              <IconButton
                sx={{
                  color: "primary.main",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "0.5rem",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
                href="https://facebook.com"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{
                  color: "primary.main",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "0.5rem",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
                href="https://twitter.com"
                target="_blank"
              >
                <Twitter />
              </IconButton>
              <IconButton
                sx={{
                  color: "primary.main",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "0.5rem",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
                href="https://instagram.com"
                target="_blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{
                  color: "primary.main",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "0.5rem",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
                href="https://github.com"
                target="_blank"
              >
                <GitHub />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
        <Box
          sx={{
            borderTop: "1px solid #ccc",
            marginTop: "2rem",
            paddingTop: "1rem",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "gray" }}>
            Copyright © 2025 PopcornTimeHub. All Rights Reserved
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Footer;

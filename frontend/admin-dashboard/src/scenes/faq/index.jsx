import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const HelpSupport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="HELP & SUPPORT" subtitle="Common Questions Submitted by Users" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I reset my password?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To reset your password, go to the login page and click on "Forgot Password." Follow the instructions sent to your registered email to create a new password.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I report a technical issue?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can report any technical issue by navigating to the "Support" section in your dashboard and filling out the issue form. Our team will get back to you within 24 hours.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can I update my profile information?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes! Go to your profile settings and update your personal information. Make sure to save changes before leaving the page.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I view submitted reports?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            All your submitted reports can be viewed in the "My Reports" section of your account dashboard. You can filter by date, type, or status.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Who do I contact for urgent issues?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            For urgent matters, you can directly reach out to the support hotline listed in the "Contact Us" section, or send an email to support@company.com.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default HelpSupport;

import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  IconButtonProps,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Form } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Scene } from "./AddScene/type";

type Props = {
  data: Scene;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function SceneCard({ data }: Props) {
  const { spacing } = useTheme();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        action={
          <Form method="post">
            <input type="hidden" name="id" value={data.id} />
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                type="submit"
                name="_action"
                value="delete"
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Form>
        }
        title={data.episode}
      />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={spacing(2)}>
          <Typography variant="subtitle2">Location</Typography>
          <Typography>{data.location?.name} </Typography>
          <Typography variant="subtitle2">Characters</Typography>
          <Box display="flex" gap={spacing(1)}>
            {data.characters.map((character) => (
              <Tooltip title={character.name} key={character.id}>
                <Avatar
                  alt={character.name || "character-image"}
                  src={character.image || ""}
                />
              </Tooltip>
            ))}
          </Box>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="subtitle2">Scene:</Typography>
          <Typography paragraph>{data.scene}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

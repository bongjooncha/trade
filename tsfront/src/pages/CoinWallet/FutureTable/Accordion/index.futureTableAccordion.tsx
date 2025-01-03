import { useContext, ReactNode } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";

const PINK = "rgba(255, 192, 203, 0.6)";
const BLUE = "rgba(0, 0, 255, 0.6)";

interface ContextAwareToggleProps {
  children: ReactNode;
  eventKey: string;
  callback?: (eventKey: string) => void;
}

function ContextAwareToggle({
  children,
  eventKey,
  callback,
}: ContextAwareToggleProps) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? PINK : BLUE }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function Example() {
  return (
    <Accordion flush>
      <Card>
        <Card.Header>
          <ContextAwareToggle eventKey="0">Click me!</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! I am the body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Example;

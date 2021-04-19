import { Button, ButtonType } from "./components/button.jsx";
import { Card } from "./components/card.jsx";
import { Chip, ChipType } from "./components/chip.jsx";
import { Heading } from "./components/heading.jsx";

function App() {
  return (
    <div className="w-7/12 bg-white">
      <div className="banner flex h-5 gap-x-2 px-4 h-14 items-center border-b-2">
        <div><img src="/logo.svg" alt="logo" className="h-12 w-12"/></div>
        <div className="flex-1">
          <Heading>Chennai covid info</Heading>
        </div>
        <div className="m-l-auto flex gap-x-2">
          <Chip type={ChipType.Info}>xxxxx</Chip>
          <Chip type={ChipType.Info}>xx</Chip>
          <Chip type={ChipType.Info}>xxxxx</Chip>
        </div>
      </div>
      <Card className="filter flex gap-x-2">
        <Button type={ButtonType.Primary}>Beds</Button>
        <Button type={ButtonType.Primary}>Plasma</Button>
        <Button type={ButtonType.Primary}>Hospitals</Button>
        <Button type={ButtonType.Primary}>Emergency contacts</Button>
      </Card>
    </div>
  );
}

export default App;

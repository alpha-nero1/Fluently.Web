import { LinkButton } from "~/components/core/inputs/linkButton/linkButton";
import { AppLayout } from "~/components/core/layout/appLayout";
import { VerticalSpacer } from "~/components/core/layout/spacer";

export default function Home() {
  return (
    <AppLayout>
        <LinkButton href="/content/generated-german-a1-something-1234567">German (A1)</LinkButton>
        <VerticalSpacer spacing={1} />
        <LinkButton href="/content/generated-italian-a1-something-1234567">Italian (A1)</LinkButton>
    </AppLayout>
  );
}

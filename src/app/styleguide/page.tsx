"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Input, Textarea } from "@/components/ui/field";
import { Kbd } from "@/components/ui/kbd";
import { SketchIcon, sketchIconNames } from "@/components/ui/sketch-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { SquiggleLink } from "@/components/ui/squiggle-link";
import { Tag } from "@/components/ui/tag";
import { useToast } from "@/components/ui/toast";
import { Tooltip } from "@/components/ui/tooltip";
import { AvatarScene } from "@/components/site/avatar-scene";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-display text-h2 font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-4">{children}</div>;
}

export default function StyleguidePage() {
  const toast = useToast();
  const [drawKey, setDrawKey] = useState(0);

  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="px-gutter mx-auto flex w-full max-w-6xl flex-col gap-16 py-12">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-h1 font-bold">Fet Strek</h1>
          <p className="text-body-lg text-ink-muted max-w-prose">
            Every primitive in the design system, in all variants. Switch theme
            with the sun and moon toggle in the header, or click the screen on
            the avatar below.
          </p>
        </div>

        <Section title="Buttons">
          <Row>
            <Button>Solid ink</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="sketch">Sketch</Button>
          </Row>
          <Row>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
            <Button variant="accent" size="sm">
              <SketchIcon name="download" size={16} />
              With icon
            </Button>
          </Row>
        </Section>

        <Section title="Squiggle links">
          <Row>
            <SquiggleLink href="/styleguide">Hover or focus me</SquiggleLink>
            <SquiggleLink href="/styleguide" active>
              Active page
            </SquiggleLink>
          </Row>
        </Section>

        <Section title="Tags">
          <Row>
            <Tag category="work">Work</Tag>
            <Tag category="freelance">Freelance</Tag>
            <Tag category="hobby">Hobby</Tag>
            <Tag>Website</Tag>
            <Tag>App</Tag>
            <Tag>Game</Tag>
            <Tag>Non-technical</Tag>
          </Row>
        </Section>

        <Section title="Cards">
          <div className="grid gap-8 md:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <Card key={index} index={index}>
                <h3 className="font-display text-h3 mb-2 font-bold">
                  Wobble {index + 1}
                </h3>
                <p className="text-body text-ink-muted">
                  Each card cycles through one of three uneven border radii so
                  no two neighbours look cloned.
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Form fields">
          <div className="grid max-w-2xl gap-8 md:grid-cols-2">
            <Input label="Name" placeholder="Ola Nordmann" />
            <Input
              label="Email"
              type="email"
              defaultValue="not-an-email"
              error="That does not look like an email address."
            />
            <Textarea
              label="Message"
              placeholder="What are we building?"
              className="md:col-span-2"
            />
          </div>
        </Section>

        <Section title="Toast">
          <Row>
            <Button
              variant="sketch"
              onClick={() => toast("It finally happened.")}
            >
              Show toast
            </Button>
            <Button variant="ghost" onClick={() => toast("Saved. Probably.")}>
              Another one
            </Button>
          </Row>
        </Section>

        <Section title="Tooltip, Kbd, Skeleton, Spinner">
          <Row>
            <Tooltip content="Tooltips stay conventional">
              <Button variant="ghost">Hover me</Button>
            </Tooltip>
            <span className="flex items-center gap-1">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
            <Spinner />
            <Spinner size={36} />
          </Row>
          <div className="flex max-w-sm flex-col gap-3">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </Section>

        <Section title="Dividers">
          <div className="flex flex-col gap-8">
            <Divider variant={1} />
            <Divider variant={2} />
          </div>
        </Section>

        <Section title="Sketch icons">
          <Row>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDrawKey((key) => key + 1)}
            >
              <SketchIcon name="play" size={16} />
              Redraw all
            </Button>
          </Row>
          <ul className="grid grid-cols-4 gap-6 sm:grid-cols-6 lg:grid-cols-8">
            {sketchIconNames.map((name) => (
              <li
                key={name}
                className="border-line/20 flex flex-col items-center gap-2 rounded-md border p-4"
              >
                <SketchIcon key={drawKey} name={name} draw={drawKey > 0} />
                <span className="text-mono-sm text-ink-muted font-mono">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Avatar scene">
          <p className="text-body text-ink-muted max-w-prose">
            Pupils follow the cursor on fine pointers at md and up, eyelids
            blink on an idle loop, and the PC screen is a button: clicking it
            toggles light mode with a circular wipe. The first light-mode unlock
            shows a toast.
          </p>
          <div className="max-w-sm">
            <AvatarScene />
          </div>
        </Section>
      </main>
      <Footer
        socials={[
          { label: "GitHub", url: "https://github.com/zaimimr" },
          { label: "LinkedIn", url: "https://www.linkedin.com/in/zaim/" },
        ]}
        email="work@zaim.no"
      />
    </>
  );
}

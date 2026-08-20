// app/components/InvoiceForm.tsx

'use client';

import { Button, TextInput, Stack, Radio, Paper, Title, ThemeIcon, Group, Divider, Text } from '@mantine/core';
import { useState } from 'react';
import { useGenerateInvoice } from '../hooks/useGenerateInvoice';
import { IconFileInvoice, IconLink } from '@tabler/icons-react';

export function InvoiceForm() {
    const [listingLink, setListingLink] = useState('');

    const [action, setAction] = useState<"download" | "open">("open")

    const generateInvoice = useGenerateInvoice();

    async function handleGenerate() {
       generateInvoice.mutate(
        { listingLink },
        {
            onSuccess: (pdf) => {
                const url = URL.createObjectURL(pdf);

                if (action === 'open') {
                    window.open(url, '_blank');
                } else {
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'invoice.pdf';
                    link.click();
                }
            },
        }
    );
    }



    return (
        <Paper withBorder radius="lg" p="xl" maw={720} mx="auto">
            <Group mb="xs" gap="sm">
                <ThemeIcon size={38} radius="md" variant="light" color="blue">
                    <IconFileInvoice size={20} />
                </ThemeIcon>
                <div>
                    <Title order={3} fw={600}>
                        Generate invoice
                    </Title>
                    <Text size="sm" c="dimmed">
                        Paste a Garage listing link to create a PDF invoice
                    </Text>
                </div>
            </Group>


            <Divider my="md" />

            <Stack gap="lg">
                <TextInput
                    label="Garage listing URL"
                    placeholder="https://www.shopgarage.com/listing/title-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    leftSection={<IconLink size={16} />}
                    value={listingLink}
                    onChange={(event) => setListingLink(event.currentTarget.value)}
                    size="md"
                    radius="md"
                />

                <Radio.Group
                    label="When it's ready"
                    value={action}
                    onChange={(value) => setAction(value as 'open' | 'download')}
                >
                    <Stack mt="xs" gap="xs">
                        <Radio value="open" label="Open in new tab" />
                        <Radio value="download" label="Download PDF" />
                    </Stack>
                </Radio.Group>

                <div className="flex justify-center gap-3">
                <Button
                    onClick={() => handleGenerate()}
                    radius="md"
                    variant="filled"
                    color="blue"
                    size="md"
                    
                    loading={generateInvoice.isPending}
                >
                    Create invoice
                </Button>
                <Button
                    onClick={() => setListingLink("")}
                    radius="md"
                    variant="filled"
                    color="blue"
                    size="md"
                    
                    loading={generateInvoice.isPending}
                >
                    Clear Input
                </Button>

                </div>
            </Stack>
        </Paper>
    );

}
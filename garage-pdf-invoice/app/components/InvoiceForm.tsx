// app/components/InvoiceForm.tsx

'use client';

import {
    Button,
    TextInput,
    Stack,
    Radio,
    Paper,
    Title,
    Text,
    Group,
    ThemeIcon,
    Divider,
    Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconFileInvoice, IconLink, IconAlertCircle } from '@tabler/icons-react';
import { useGenerateInvoice } from '../hooks/useGenerateInvoice';

interface InvoiceFormValues {
    listingLink: string;
    action: 'open' | 'download';
}

function isValidUrl(value: string) {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

export function InvoiceForm() {
    const generateInvoice = useGenerateInvoice(); // hook for backend

    // used mantine's forms for state
    const form = useForm<InvoiceFormValues>({
        initialValues: {
            listingLink: '',
            action: 'open',
        },
        validate: {
            listingLink: (value) => {
                if (!value.trim()) return 'Enter a listing URL';
                if (!isValidUrl(value)) return 'Enter a valid URL, including https://';
                if (!value.startsWith("https://www.shopgarage.com/listing")) return "Enter a garage URL in the form https://www.shopgarage.com/listing/{id}"
                return null;
            },
        },
    });

    function handleSubmit(values: InvoiceFormValues) {
        generateInvoice.mutate(
            { listingLink: values.listingLink },
            {
                onSuccess: (pdf) => {
                    const url = URL.createObjectURL(pdf);

                    if (values.action === 'open') {
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

    function handleClear() {
        form.reset();
        generateInvoice.reset();
    }

    return (
        <Paper withBorder radius="lg" p="xl" w="100%" maw={720} mx="auto">
            <Group mb="xs" gap="sm">
                <ThemeIcon size={38} radius="md" variant="light" color="orange">
                    <IconFileInvoice size={20} />
                </ThemeIcon>
                <div>
                    <Title order={3} fw={600}>
                        Generate invoice
                    </Title>
                    <Text size="sm" c="dimmed">
                        Paste a listing link to create a PDF invoice
                    </Text>
                </div>
            </Group>

            <Divider my="md" />

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="lg">
                    <TextInput
                        label="Garage listing URL"
                        placeholder="https://garagesale.example/listing/123"
                        description="We'll pull the item details straight from this page"
                        leftSection={<IconLink size={16} />}
                        size="md"
                        radius="md"
                        {...form.getInputProps('listingLink')}
                    />

                    <Radio.Group
                        label="When it's ready"
                        {...form.getInputProps('action')}
                    >
                        <Stack mt="xs" gap="xs">
                            <Radio value="open" label="Open in a new tab" />
                            <Radio value="download" label="Download the PDF" />
                        </Stack>
                    </Radio.Group>

                    {generateInvoice.isError && (
                        <Alert
                            variant="light"
                            color="red"
                            radius="md"
                            icon={<IconAlertCircle size={16} />}
                            title="Couldn't generate invoice"
                        >
                            {generateInvoice.error instanceof Error
                                ? generateInvoice.error.message
                                : 'Something went wrong. Check the link and try again.'}
                        </Alert>
                    )}

                    <div className="flex justify-center gap-3">
                        <Button
                            type="submit"
                            radius="md"
                            variant="filled"
                            color="orange"
                            size="md"
                            loading={generateInvoice.isPending}
                        >
                            Create invoice
                        </Button>
                        <Button
                            type="button"
                            radius="md"
                            variant="filled"
                            color="orange"
                            size="md"
                            onClick={handleClear}
                        >
                            Reset
                        </Button>
                    </div>
                </Stack>
            </form>
        </Paper>
    );
}
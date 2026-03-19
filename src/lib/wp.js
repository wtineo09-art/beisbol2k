export const WP_GRAPHQL_URL = import.meta.env.WP_GRAPHQL_URL || 'https://html.beisbol2k.com/graphql';

export async function wpquery({ query, variables = {} }) {
  const response = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    console.error(`Error connecting to WP GraphQL: ${response.statusText}`);
    return null;
  }

  const { data, errors } = await response.json();

  if (errors) {
    console.error('GraphQL Errors:', errors);
    throw new Error('Failed to fetch from WordPress API');
  }

  return data;
}

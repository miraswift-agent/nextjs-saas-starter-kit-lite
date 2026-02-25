/**
 * Built-in app template catalog.
 * Ported from the local AutoSelfHost 20-app catalog.
 * Used for seeding the DB and as a fallback reference.
 */

export interface AppTemplateField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'password' | 'toggle';
  required: boolean;
  placeholder?: string;
  default?: string;
  options?: string[];
}

export interface AppTemplate {
  slug: string;
  name: string;
  description: string;
  category: string;
  emoji: string;
  tags: string[];
  fields: AppTemplateField[];
  compose_hints: string;
  links?: { docs?: string; image?: string };
}

export const APP_CATALOG: AppTemplate[] = [
  {
    slug: 'nginx-proxy-manager',
    name: 'Nginx Proxy Manager',
    description: 'Reverse proxy with a beautiful web UI for managing SSL certificates and proxy hosts.',
    category: 'Networking',
    emoji: '🌐',
    tags: ['reverse-proxy', 'ssl', 'networking'],
    fields: [
      { id: 'http_port', label: 'HTTP Port', type: 'number', required: true, default: '80' },
      { id: 'https_port', label: 'HTTPS Port', type: 'number', required: true, default: '443' },
      { id: 'admin_port', label: 'Admin UI Port', type: 'number', required: true, default: '81' },
    ],
    compose_hints: 'Use jc21/nginx-proxy-manager image. Needs persistent data and letsencrypt volumes. Expose HTTP, HTTPS, and admin ports.',
    links: { docs: 'https://nginxproxymanager.com/guide/' },
  },
  {
    slug: 'portainer',
    name: 'Portainer',
    description: 'Container management UI for Docker and Kubernetes.',
    category: 'Management',
    emoji: '🐳',
    tags: ['docker', 'management', 'containers'],
    fields: [
      { id: 'port', label: 'Web UI Port', type: 'number', required: true, default: '9443' },
      { id: 'edition', label: 'Edition', type: 'select', required: true, default: 'ce', options: ['ce', 'ee'] },
    ],
    compose_hints: 'Use portainer/portainer-ce image. Mount /var/run/docker.sock. Use HTTPS (9443). Persistent volume for data.',
    links: { docs: 'https://docs.portainer.io/' },
  },
  {
    slug: 'nextcloud',
    name: 'Nextcloud',
    description: 'Self-hosted productivity platform — files, calendar, contacts, and more.',
    category: 'Productivity',
    emoji: '☁️',
    tags: ['cloud', 'files', 'office'],
    fields: [
      { id: 'port', label: 'Web Port', type: 'number', required: true, default: '8080' },
      { id: 'db_password', label: 'Database Password', type: 'password', required: true, placeholder: 'Strong password' },
      { id: 'admin_user', label: 'Admin Username', type: 'text', required: true, default: 'admin' },
      { id: 'admin_password', label: 'Admin Password', type: 'password', required: true, placeholder: 'Strong password' },
    ],
    compose_hints: 'Use nextcloud:stable image with MariaDB backend. Needs data and db volumes. Configure NEXTCLOUD_TRUSTED_DOMAINS.',
    links: { docs: 'https://docs.nextcloud.com/' },
  },
  {
    slug: 'vaultwarden',
    name: 'Vaultwarden',
    description: 'Lightweight Bitwarden-compatible password manager server.',
    category: 'Security',
    emoji: '🔐',
    tags: ['passwords', 'security', 'bitwarden'],
    fields: [
      { id: 'port', label: 'Web Port', type: 'number', required: true, default: '8222' },
      { id: 'admin_token', label: 'Admin Token', type: 'password', required: true, placeholder: 'Generate a secure token' },
      { id: 'signups_allowed', label: 'Allow Signups', type: 'toggle', required: false, default: 'false' },
    ],
    compose_hints: 'Use vaultwarden/server image. Single container. Persistent volume for /data. Set ADMIN_TOKEN and SIGNUPS_ALLOWED env vars.',
    links: { docs: 'https://github.com/dani-garcia/vaultwarden/wiki' },
  },
  {
    slug: 'home-assistant',
    name: 'Home Assistant',
    description: 'Open-source home automation platform.',
    category: 'IoT',
    emoji: '🏠',
    tags: ['home-automation', 'iot', 'smart-home'],
    fields: [
      { id: 'port', label: 'Web Port', type: 'number', required: true, default: '8123' },
      { id: 'timezone', label: 'Timezone', type: 'text', required: true, default: 'America/Chicago' },
    ],
    compose_hints: 'Use ghcr.io/home-assistant/home-assistant:stable. Network mode host recommended. Persistent config volume. Set TZ env var.',
    links: { docs: 'https://www.home-assistant.io/docs/' },
  },
  {
    slug: 'plex',
    name: 'Plex Media Server',
    description: 'Stream your media library to any device.',
    category: 'Media',
    emoji: '🎬',
    tags: ['media', 'streaming', 'video'],
    fields: [
      { id: 'port', label: 'Web Port', type: 'number', required: true, default: '32400' },
      { id: 'claim_token', label: 'Claim Token', type: 'text', required: false, placeholder: 'From plex.tv/claim' },
      { id: 'media_path', label: 'Media Path', type: 'text', required: true, placeholder: '/path/to/media' },
    ],
    compose_hints: 'Use plexinc/pms-docker image. Expose port 32400. Bind mount for media. Config volume. Set PLEX_CLAIM for first setup.',
    links: { docs: 'https://support.plex.tv/' },
  },
  {
    slug: 'gitea',
    name: 'Gitea',
    description: 'Lightweight self-hosted Git service.',
    category: 'Development',
    emoji: '🍵',
    tags: ['git', 'code', 'development'],
    fields: [
      { id: 'http_port', label: 'HTTP Port', type: 'number', required: true, default: '3000' },
      { id: 'ssh_port', label: 'SSH Port', type: 'number', required: true, default: '2222' },
      { id: 'db_password', label: 'Database Password', type: 'password', required: true },
    ],
    compose_hints: 'Use gitea/gitea image with PostgreSQL. Expose HTTP and SSH ports. Data volume for /data. Set ROOT_URL.',
    links: { docs: 'https://docs.gitea.com/' },
  },
  {
    slug: 'uptime-kuma',
    name: 'Uptime Kuma',
    description: 'Self-hosted monitoring tool like Uptime Robot.',
    category: 'Monitoring',
    emoji: '📊',
    tags: ['monitoring', 'uptime', 'alerts'],
    fields: [
      { id: 'port', label: 'Web Port', type: 'number', required: true, default: '3001' },
    ],
    compose_hints: 'Use louislam/uptime-kuma image. Single container. Persistent volume for /app/data.',
    links: { docs: 'https://github.com/louislam/uptime-kuma/wiki' },
  },
  {
    slug: 'grafana',
    name: 'Grafana',
    description: 'Analytics and monitoring dashboards.',
    category: 'Monitoring',
    emoji: '📈',
    tags: ['monitoring', 'dashboards', 'analytics'],
    fields: [
      { id: 'port', label: 'Web Port', type: 'number', required: true, default: '3000' },
      { id: 'admin_password', label: 'Admin Password', type: 'password', required: true, default: 'admin' },
    ],
    compose_hints: 'Use grafana/grafana-oss image. Persistent volume for /var/lib/grafana. Set GF_SECURITY_ADMIN_PASSWORD.',
    links: { docs: 'https://grafana.com/docs/grafana/latest/' },
  },
  {
    slug: 'jellyfin',
    name: 'Jellyfin',
    description: 'Free open-source media server — movies, TV, music, and live TV.',
    category: 'Media',
    emoji: '🎵',
    tags: ['media', 'streaming', 'free'],
    fields: [
      { id: 'port', label: 'Web Port', type: 'number', required: true, default: '8096' },
      { id: 'media_path', label: 'Media Path', type: 'text', required: true, placeholder: '/path/to/media' },
    ],
    compose_hints: 'Use jellyfin/jellyfin image. Bind mount for media. Config and cache volumes. Optional GPU passthrough for transcoding.',
    links: { docs: 'https://jellyfin.org/docs/' },
  },
  {
    slug: 'immich',
    name: 'Immich',
    description: 'Self-hosted Google Photos alternative with ML-powered features.',
    category: 'Media',
    emoji: '📸',
    tags: ['photos', 'backup', 'ai'],
    fields: [
      { id: 'port', label: 'Web Port', type: 'number', required: true, default: '2283' },
      { id: 'db_password', label: 'Database Password', type: 'password', required: true },
      { id: 'upload_path', label: 'Upload Path', type: 'text', required: true, placeholder: '/path/to/photos' },
    ],
    compose_hints: 'Use ghcr.io/immich-app/immich-server. Requires PostgreSQL with pgvecto.rs and Redis. Multi-container setup. Upload volume.',
    links: { docs: 'https://immich.app/docs/' },
  },
  {
    slug: 'traefik',
    name: 'Traefik',
    description: 'Cloud-native reverse proxy and load balancer with automatic HTTPS.',
    category: 'Networking',
    emoji: '🔀',
    tags: ['reverse-proxy', 'ssl', 'networking', 'cloud-native'],
    fields: [
      { id: 'http_port', label: 'HTTP Port', type: 'number', required: true, default: '80' },
      { id: 'https_port', label: 'HTTPS Port', type: 'number', required: true, default: '443' },
      { id: 'dashboard_port', label: 'Dashboard Port', type: 'number', required: true, default: '8080' },
      { id: 'acme_email', label: 'ACME Email', type: 'text', required: true, placeholder: 'you@example.com' },
    ],
    compose_hints: 'Use traefik:v3.0 image. Mount docker.sock for provider discovery. Persistent acme.json volume for certificates. Enable dashboard.',
    links: { docs: 'https://doc.traefik.io/traefik/' },
  },
  {
    slug: 'pi-hole',
    name: 'Pi-hole',
    description: 'Network-wide ad blocker and DNS sinkhole.',
    category: 'Networking',
    emoji: '🕳️',
    tags: ['dns', 'adblock', 'networking'],
    fields: [
      { id: 'web_port', label: 'Web UI Port', type: 'number', required: true, default: '8080' },
      { id: 'web_password', label: 'Web Password', type: 'password', required: true },
    ],
    compose_hints: 'Use pihole/pihole image. Expose DNS (53/tcp, 53/udp) and web UI. Set WEBPASSWORD. Persistent volumes for /etc/pihole and /etc/dnsmasq.d.',
    links: { docs: 'https://docs.pi-hole.net/' },
  },
  {
    slug: 'wireguard',
    name: 'WireGuard (wg-easy)',
    description: 'Simple WireGuard VPN server with a web UI.',
    category: 'Networking',
    emoji: '🛡️',
    tags: ['vpn', 'wireguard', 'networking'],
    fields: [
      { id: 'port', label: 'VPN Port', type: 'number', required: true, default: '51820' },
      { id: 'web_port', label: 'Web UI Port', type: 'number', required: true, default: '51821' },
      { id: 'password', label: 'Web Password', type: 'password', required: true },
      { id: 'hostname', label: 'Public Hostname', type: 'text', required: true, placeholder: 'vpn.example.com' },
    ],
    compose_hints: 'Use ghcr.io/wg-easy/wg-easy image. Expose UDP VPN port and TCP web UI port. Set WG_HOST and PASSWORD. Needs NET_ADMIN cap.',
    links: { docs: 'https://github.com/wg-easy/wg-easy' },
  },
  {
    slug: 'n8n',
    name: 'n8n',
    description: 'Workflow automation tool — open-source Zapier alternative.',
    category: 'Automation',
    emoji: '⚡',
    tags: ['automation', 'workflows', 'integration'],
    fields: [
      { id: 'port', label: 'Web Port', type: 'number', required: true, default: '5678' },
      { id: 'webhook_url', label: 'Webhook URL', type: 'text', required: false, placeholder: 'https://n8n.example.com' },
    ],
    compose_hints: 'Use n8nio/n8n image. Persistent volume for /home/node/.n8n. Set N8N_HOST and WEBHOOK_URL. Optional PostgreSQL backend.',
    links: { docs: 'https://docs.n8n.io/' },
  },
  {
    slug: 'nocodb',
    name: 'NocoDB',
    description: 'Open-source Airtable alternative — turns any database into a smart spreadsheet.',
    category: 'Productivity',
    emoji: '📋',
    tags: ['database', 'spreadsheet', 'no-code'],
    fields: [
      { id: 'port', label: 'Web Port', type: 'number', required: true, default: '8080' },
      { id: 'db_password', label: 'Database Password', type: 'password', required: true },
    ],
    compose_hints: 'Use nocodb/nocodb image with PostgreSQL. Set NC_DB connection string. Persistent data volume.',
    links: { docs: 'https://docs.nocodb.com/' },
  },
  {
    slug: 'ollama',
    name: 'Ollama',
    description: 'Run large language models locally.',
    category: 'AI',
    emoji: '🦙',
    tags: ['ai', 'llm', 'ml'],
    fields: [
      { id: 'port', label: 'API Port', type: 'number', required: true, default: '11434' },
      { id: 'gpu', label: 'GPU Passthrough', type: 'toggle', required: false, default: 'true' },
    ],
    compose_hints: 'Use ollama/ollama image. Expose API port. Persistent volume for /root/.ollama. If GPU enabled, add nvidia runtime and deploy resources with GPU reservation.',
    links: { docs: 'https://ollama.com/' },
  },
  {
    slug: 'open-webui',
    name: 'Open WebUI',
    description: 'ChatGPT-style web interface for Ollama and OpenAI-compatible APIs.',
    category: 'AI',
    emoji: '💬',
    tags: ['ai', 'chat', 'ui'],
    fields: [
      { id: 'port', label: 'Web Port', type: 'number', required: true, default: '3000' },
      { id: 'ollama_url', label: 'Ollama API URL', type: 'text', required: false, default: 'http://ollama:11434' },
    ],
    compose_hints: 'Use ghcr.io/open-webui/open-webui image. Set OLLAMA_BASE_URL. Persistent volume for /app/backend/data.',
    links: { docs: 'https://docs.openwebui.com/' },
  },
  {
    slug: 'paperless-ngx',
    name: 'Paperless-ngx',
    description: 'Document management system that transforms physical documents into a searchable archive.',
    category: 'Productivity',
    emoji: '📄',
    tags: ['documents', 'ocr', 'archive'],
    fields: [
      { id: 'port', label: 'Web Port', type: 'number', required: true, default: '8000' },
      { id: 'admin_user', label: 'Admin Username', type: 'text', required: true, default: 'admin' },
      { id: 'admin_password', label: 'Admin Password', type: 'password', required: true },
      { id: 'db_password', label: 'Database Password', type: 'password', required: true },
    ],
    compose_hints: 'Use ghcr.io/paperless-ngx/paperless-ngx image with PostgreSQL and Redis. Volumes for data, media, consume, export. Set PAPERLESS_ADMIN_USER/PASSWORD.',
    links: { docs: 'https://docs.paperless-ngx.com/' },
  },
  {
    slug: 'homepage',
    name: 'Homepage',
    description: 'Modern, highly customizable application dashboard.',
    category: 'Management',
    emoji: '🏡',
    tags: ['dashboard', 'homepage', 'management'],
    fields: [
      { id: 'port', label: 'Web Port', type: 'number', required: true, default: '3000' },
    ],
    compose_hints: 'Use ghcr.io/gethomepage/homepage image. Mount config directory. Optional Docker socket mount for widget auto-discovery.',
    links: { docs: 'https://gethomepage.dev/' },
  },
];

export const CATEGORIES = [...new Set(APP_CATALOG.map(a => a.category))].sort();

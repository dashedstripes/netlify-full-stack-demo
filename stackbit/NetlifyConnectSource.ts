import path from 'path'
import { getVersion, type Asset, type ContentChanges, type ContentSourceInterface, type Document, type InitOptions, type Logger, type Model, type ScheduledAction, type ScheduledActionActionType, type Schema, type UpdateOperation, type UpdateOperationField, type ValidationError, type Version } from '@stackbit/types';

export class NetlifyConnectAPIClient {
  private readonly apiKey: string

  constructor({ apiKey }: { apiKey: string}) {
    this.apiKey = apiKey;
  }

  async getModels(): Promise<any[]> {
    console.log(fetch);

    return []
  }
}

export interface ContentSourceOptions {
  projectId: string
  apiKey: string
}

interface UserContext {
  /* ... */
}
interface SchemaContext {
  /* ... */
}
interface DocumentContext {
  /* ... */
}
interface AssetContext {
  /* ... */
}

export class NetlifyConnectSource implements ContentSourceInterface {
  private readonly projectId: string
  private readonly apiKey: string
  private apiClient: NetlifyConnectAPIClient


  constructor(options: ContentSourceOptions) {
    this.projectId = options.projectId
    this.apiKey = options.apiKey
    this.apiClient = new NetlifyConnectAPIClient({
      apiKey: this.apiKey
    });
  }

  async getVersion(): Promise<Version> {
    return getVersion({
      packageJsonPath: path.join(__dirname, 'package.json'),
    })
  }
  
  getContentSourceType(): string {
    return 'netlify_connect_source'
  }
  getProjectId(): string {
    return this.projectId
  }
  getProjectEnvironment(): string {
    throw new Error('Method not implemented.');
  }
  getProjectManageUrl(): string {
    throw new Error('Method not implemented.');
  }

  async init() {
    this.apiClient = new NetlifyConnectAPIClient({
      apiKey: this.apiKey
    });
  }

  reset(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  destroy(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  onWebhook?(data: { data: unknown; headers: Record<string, string>; }): void {
    throw new Error('Method not implemented.');
  }
  onFilesChange?({ updatedFiles }: { updatedFiles: string[]; }): Promise<{ invalidateSchema?: boolean | undefined; contentChanges?: ContentChanges<unknown, unknown> | undefined; }> {
    throw new Error('Method not implemented.');
  }
  startWatchingContentUpdates?(): void {
    throw new Error('Method not implemented.');
  }
  stopWatchingContentUpdates?(): void {
    throw new Error('Method not implemented.');
  }
  async getSchema(): Promise<Schema<unknown, unknown>> {
    const models = await this.apiClient.getModels()

    console.log(models);
    throw new Error('Method not implemented.');
  }
  getDocuments(): Promise<Document<unknown>[]> {
    throw new Error('Method not implemented.');
  }
  getAssets(): Promise<Asset<unknown>[]> {
    throw new Error('Method not implemented.');
  }
  hasAccess(options: { userContext?: { name: string; email: string; } | undefined; }): Promise<{ hasConnection: boolean; hasPermissions: boolean; }> {
    throw new Error('Method not implemented.');
  }
  createDocument(options: { updateOperationFields: Record<string, UpdateOperationField>; model: Model<unknown>; locale?: string | undefined; defaultLocaleDocumentId?: string | undefined; userContext?: { name: string; email: string; } | undefined; }): Promise<{ documentId: string; }> {
    throw new Error('Method not implemented.');
  }
  updateDocument(options: { document: Document<unknown>; operations: UpdateOperation[]; userContext?: { name: string; email: string; } | undefined; }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteDocument(options: { document: Document<unknown>; userContext?: { name: string; email: string; } | undefined; }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getScheduledActions?(): Promise<ScheduledAction[]> {
    throw new Error('Method not implemented.');
  }
  createScheduledAction?(options: { name: string; action: ScheduledActionActionType; documentIds: string[]; executeAt: string; userContext?: { name: string; email: string; } | undefined; }): Promise<{ newScheduledActionId: string; }> {
    throw new Error('Method not implemented.');
  }
  cancelScheduledAction?(options: { scheduledActionId: string; userContext?: { name: string; email: string; } | undefined; }): Promise<{ cancelledScheduledActionId: string; }> {
    throw new Error('Method not implemented.');
  }
  updateScheduledAction?(options: { scheduledActionId: string; name?: string | undefined; documentIds?: string[] | undefined; executeAt?: string | undefined; userContext?: { name: string; email: string; } | undefined; }): Promise<{ updatedScheduledActionId: string; }> {
    throw new Error('Method not implemented.');
  }
  uploadAsset(options: { url?: string | undefined; base64?: string | undefined; fileName: string; mimeType: string; locale?: string | undefined; userContext?: { name: string; email: string; } | undefined; }): Promise<Asset<unknown>> {
    throw new Error('Method not implemented.');
  }
  validateDocuments(options: { documents: Document<unknown>[]; assets: Asset<unknown>[]; locale?: string | undefined; userContext?: { name: string; email: string; } | undefined; }): Promise<{ errors: ValidationError[]; }> {
    throw new Error('Method not implemented.');
  }
  publishDocuments(options: { documents: Document<unknown>[]; assets: Asset<unknown>[]; userContext?: { name: string; email: string; } | undefined; }): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // ContentSourceInterface methods ...
}
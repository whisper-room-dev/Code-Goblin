import { Collection } from 'oceanic.js';

import config from '../config/config.js';
import { Database } from '../database/index.js';
import { GoodbyeCommandController } from '../database/mongodb/controllers/goodbye.js';
import { CodeJamCommandController } from '../database/mongodb/controllers/jam.js';
import { TagCommandController } from '../database/mongodb/controllers/tag.js';
import { WelcomeCommandController } from '../database/mongodb/controllers/welcome.js';
import type { MainCollections } from '../typings/core/types.js';
import { logger as ILogger, Utils } from '../utils/index.js';
import { DiscordClient as IDiscordClient } from './structures/client.js';

export default class Main {
	/** The Discord Api Client */
	public DiscordClient: IDiscordClient;
	/** Common Collections used throughout the bot*/
	public collections: MainCollections;
	/** A class for bot common api utilities */
	public utils: Utils;
	/** Database Schemas, cache, etc */
	public database: Database;
	public logger;

	public constructor() {
		this.utils = new Utils(this);
		this.database = new Database(this);
		this.DiscordClient = new IDiscordClient(this);
		this.collections = {
			commands: {
				commandStoreMap: new Collection(),
				commandStoreArrayJsonGuild: [],
				commandStoreArrayJsonGlobal: []
			},
			controllers: {
				tags: new TagCommandController(this),
				welcome: new WelcomeCommandController(this),
				goodbye: new GoodbyeCommandController(this),
				jam: new CodeJamCommandController(this)
			},
			keys: {
				super_users: new Set(config.SuperUsers),
				helper_users: new Set(config.HelperUsers),
				config: config
			}
		};
		this.logger = ILogger;
	}

	public async init(): Promise<void> {
		await this.database.init();
		await this.DiscordClient.init();
	}
}
import type { ApplicationCommandBuilder } from '@oceanicjs/builders';
import type { ApplicationCommandTypes, Collection, CommandInteraction, Permission, PermissionName } from 'oceanic.js';
import type { CreateApplicationCommandOptions } from 'oceanic.js';
import type config from '../../config/config.js';
import type Main from '../../core/main.js';
import type { GoodbyeCommandController } from '../../database/mongodb/controllers/goodbye.js';
import type { CodeJamCommandController } from '../../database/mongodb/controllers/jam.js';
import type { TagCommandController } from '../../database/mongodb/controllers/tag.js';
import type { WelcomeCommandController } from '../../database/mongodb/controllers/welcome.js';

export interface MainCollections {
	/** A Collection of all command information and data */
	commands: MainCollectionCommands;
	/** A Collection of all plugin information and data */
	controllers: MainCollectionControllers;
	/** A Collection of keys used throughout the bot */
	keys: MainCollectionKeys;
}

export interface MainCollectionKeys {
	super_users: Set<string>;
	helper_users: Set<string>;
	config: typeof config;
}

interface MainCollectionCommands {
	/** Used to store all commands */
	commandStoreMap: Collection<string, Command>;
	/** An array of all commands as Json Data for the discord api guild application commands */
	commandStoreArrayJsonGuild: CreateApplicationCommandOptions[];
	/** An array of all commands as Json Data for the discord api global application commands */
	commandStoreArrayJsonGlobal: CreateApplicationCommandOptions[];
}

interface MainCollectionControllers {
	tags: TagCommandController;
	welcome: WelcomeCommandController;
	goodbye: GoodbyeCommandController;
	jam: CodeJamCommandController;
}

export interface CommandDataProp {
	props: Command;
	toJson: () => CreateApplicationCommandOptions;
}

export type CommandRegisterType = 'global' | 'guild' | 'both';

/**
 * The type structure for a command
 */
export interface Command {
	/** The name of the command interaction data */
	trigger: string;
	description: string;
	type: ApplicationCommandTypes;
	options?: (opts: ApplicationCommandBuilder) => void;
	run: (instance: Main, interaction: CommandInteraction) => Promise<any> | any;
	register: CommandRegisterType;
	requiredUserPermissions?: PermissionName[];
	requiredBotPermissions?: PermissionName[];
	defaultMemberPermissions?: bigint | string | Permission | Array<PermissionName>;
	descriptionLocalizations?: Record<string, string>;
	dmPermission?: boolean;
	nameLocalizations?: Record<string, string>;
	toJson?: CreateApplicationCommandOptions;
	superUserOnly?: boolean;
	helperUserOnly?: boolean;
	disabled?: boolean;
	nsfw?: boolean;
	premiumOnly?: boolean;
}
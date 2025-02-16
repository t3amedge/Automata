import { Band, bassBoostEqualizer, softEqualizer, tvEqualizer, trebleBassEqualizer, vaporwaveEqualizer } from '../Utils/EQPresets';
import { KaraokeOptions, TimescaleOptions, VibratoOptions, RotationOptions } from '../Interfaces/FilterInterfaces';
import { Player } from './Player';

/** Supercharges the acoustics of the Player via sound filters. */
export class Filters {
	/** The player. */
	public player: Player;
	/** The volume of the player. */
	public volume: number = null;
	/** The EQ bands. */
	public equalizer: Band[] = [];
	/** The vibrato options. */
	public vibrato: VibratoOptions = null;
	/** The rotation options. */
	public rotation: RotationOptions = null;
	/** The timescale options. */
	public timescale: TimescaleOptions = null;
	/** The karaoke options. */
	public karaoke: KaraokeOptions = null;

	constructor(player: Player) {
		this.player = player;
	}

	/**
	 * Sets the equalizer bands and updates the filters.
	 * @param bands - The equalizer bands.
	 * @returns The updated Filters instance applied to the currently playing track.
	 */
	public setEqualizer(bands?: Band[]): this {
		this.equalizer = bands;
		this.updateFilters();
		return this;
	}

	/**
	 * Applies the 8D filter.
	 * @returns The updated Filters instance applied to the currently playing track.
	*/
	public eightD(): this {
		return this.setRotation({ rotationHz: 0.2 });
	}

	/**
	 * Applies the bass boost filter.
	 * @returns The updated Filters instance applied to the currently playing track.
	*/
	public bassBoost(): this {
		return this.setEqualizer(bassBoostEqualizer);
	}

	/**
	 * Applies the nightcore filter.
	 * @returns The updated Filters instance applied to the currently playing track.
	*/
	public nightcore(): this {
		return this.setTimescale({
			speed: 1.1,
			pitch: 1.125,
			rate: 1.05,
		});
	}

	/**
	 * Applies the slow motion filter.
	 * @returns The updated Filters instance applied to the currently playing track.
	*/
	public slowmo(): this {
		return this.setTimescale({
			speed: 0.5,
			pitch: 1.0,
			rate: 0.8,
		});
	}

	/**
	 * Applies the soft filter.
	 * @returns The updated Filters instance applied to the currently playing track.
	 */
	public soft(): this {
		return this.setEqualizer(softEqualizer);
	}

	/**
	 * Applies the TV filter.
	 * @returns The updated Filters instance applied to the currently playing track.
	*/
	public tv(): this {
		return this.setEqualizer(tvEqualizer);
	}

	/**
	 * Applies the treble bass filter.
	 * @returns The updated Filters instance applied to the currently playing track.
	*/
	public trebleBass(): this {
		return this.setEqualizer(trebleBassEqualizer);
	}

	/**
	 * Applies the vaporwave filter.
	 * @returns The updated Filters instance applied to the currently playing track.
	*/
	public vaporwave(): this {
		this.setEqualizer(vaporwaveEqualizer);
		return this.setTimescale({ pitch: 0.55 });
	}

	/**
	 * Applies the karaoke options specified by the filter.
	 * @returns The updated Filters instance applied to the currently playing track.
	 */
	public setKaraoke(karaoke?: KaraokeOptions): this {
		this.karaoke = karaoke ?? null;
		this.updateFilters();

		return this;
	}

	/**
	 * Applies the timescale options specified by the filter.
	 * @returns The updated Filters instance applied to the currently playing track.
	 */
	public setTimescale(timescale?: TimescaleOptions): this {
		this.timescale = timescale ?? null;
		this.updateFilters();

		return this;
	}

	/**
	 * Applies the vibrato options specified by the filter.
	 * @returns The updated Filters instance applied to the currently playing track.
	 */
	public setVibrato(vibrato?: VibratoOptions): this {
		this.vibrato = vibrato ?? null;
		this.updateFilters();
		return this;
	}

	/**
	 * Applies the rotation options specified by the filter.
	 * @returns The updated Filters instance applied to the currently playing track.
	 */
	public setRotation(rotation?: RotationOptions): this {
		this.rotation = rotation ?? null;
		this.updateFilters();

		return this;
	}

	/**
	 * Clears the filters.
	 * @returns The updated Filters instance applied to the currently playing track.
	 */
	public clearFilters(): this {
		this.player.filters = new Filters(this.player);
		this.updateFilters();
		return this;
	}

	/**
     * Updates the filters.
     * @returns The updated Filters instance applied to the currently playing track.
     */
	public updateFilters(): this {
		const { equalizer, karaoke, timescale, vibrato, rotation, volume } = this;

		this.volume = this.player.volume;

		this.player.node.rest.updatePlayer({
			guildId: this.player.options.guildId,
			data: {
				filters: {
					volume, equalizer, karaoke, timescale, vibrato, rotation,
				},
			},
		});

		return this;
	}
}


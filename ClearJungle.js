"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearJungle = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const TerrainFeatureRegistry_1 = require("@civ-clone/core-terrain-feature/TerrainFeatureRegistry");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
const ClearingJungle_1 = require("./Rules/ClearingJungle");
const DelayedAction_1 = require("@civ-clone/core-unit/DelayedAction");
const Feature_1 = require("@civ-clone/core-terrain-feature/Rules/Feature");
const Grassland_1 = require("@civ-clone/base-terrain-grassland/Grassland");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const MovementCost_1 = require("@civ-clone/core-unit/Rules/MovementCost");
const Shield_1 = require("@civ-clone/base-terrain-feature-shield/Shield");
// TODO: This is specific to the original Civilization and might need to be labelled as `-civ1` as other games have
//  forests as a feature
class ClearJungle extends DelayedAction_1.default {
    constructor(from, to, unit, ruleRegistry = RuleRegistry_1.instance, terrainFeatureRegistry = TerrainFeatureRegistry_1.instance, turn = Turn_1.instance) {
        super(from, to, unit, ruleRegistry, turn);
        this._terrainFeatureRegistry = terrainFeatureRegistry;
    }
    perform() {
        const [moveCost] = this.ruleRegistry()
            .process(MovementCost_1.default, this.unit(), this)
            .sort((a, b) => b - a);
        super.perform(moveCost, () => {
            const terrain = new Grassland_1.default(), features = this._terrainFeatureRegistry.getByTerrain(this.from().terrain());
            this.ruleRegistry().process(Feature_1.default, Shield_1.default, terrain);
            this._terrainFeatureRegistry.unregister(...features);
            this.from().setTerrain(terrain);
        }, ClearingJungle_1.default);
        this.ruleRegistry().process(Moved_1.default, this.unit(), this);
    }
}
exports.ClearJungle = ClearJungle;
exports.default = ClearJungle;
//# sourceMappingURL=ClearJungle.js.map
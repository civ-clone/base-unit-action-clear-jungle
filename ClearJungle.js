"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ClearJungle_terrainFeatureRegistry;
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
        _ClearJungle_terrainFeatureRegistry.set(this, void 0);
        __classPrivateFieldSet(this, _ClearJungle_terrainFeatureRegistry, terrainFeatureRegistry, "f");
    }
    perform() {
        const [moveCost] = this.ruleRegistry()
            .process(MovementCost_1.default, this.unit(), this)
            .sort((a, b) => b - a);
        super.perform(moveCost, () => {
            const terrain = new Grassland_1.default(), features = __classPrivateFieldGet(this, _ClearJungle_terrainFeatureRegistry, "f").getByTerrain(this.from().terrain());
            this.ruleRegistry().process(Feature_1.default, Shield_1.default, terrain);
            __classPrivateFieldGet(this, _ClearJungle_terrainFeatureRegistry, "f").unregister(...features);
            this.from().setTerrain(terrain);
        }, ClearingJungle_1.default);
        this.ruleRegistry().process(Moved_1.default, this.unit(), this);
    }
}
exports.ClearJungle = ClearJungle;
_ClearJungle_terrainFeatureRegistry = new WeakMap();
exports.default = ClearJungle;
//# sourceMappingURL=ClearJungle.js.map
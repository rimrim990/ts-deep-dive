/**
 * ES Module syntax
 */

// import nothing, but the imported file will be evaluated.
import './typeof'

// import type only.
import {type DefaultEsmLegacyPreset} from "ts-jest";

export default function helloworld() {
    console.log("Hello, world")
}
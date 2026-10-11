import { geoMercator, geoPath, type GeoProjection, type GeoPermissibleObjects } from "d3-geo";
import karnatakaGeoJson from "../data/karnataka.geo.json";

export const MAP_WIDTH = 720;
export const MAP_HEIGHT = 960;
export const MAP_PADDING = 36;

/**
 * Creates and returns the canonical d3-geo projection for the Karnataka state boundary.
 * Exported for reuse across Explore map, route planner, and admin views.
 */
export function getKarnatakaProjection(
  width = MAP_WIDTH,
  height = MAP_HEIGHT,
  padding = MAP_PADDING
): GeoProjection {
  const proj = geoMercator();
  proj.fitExtent(
    [
      [padding, padding],
      [width - padding, height - padding],
    ],
    karnatakaGeoJson as unknown as GeoPermissibleObjects
  );
  return proj;
}

/**
 * Singleton canonical projection instance at standard SVG dimensions.
 */
export const defaultKarnatakaProjection = getKarnatakaProjection();

/**
 * Projects a [longitude, latitude] pair into SVG [x, y] coordinates.
 */
export function projectCoordinates(
  lng: number,
  lat: number,
  projection: GeoProjection = defaultKarnatakaProjection
): [number, number] | null {
  const pt = projection([lng, lat]);
  if (!pt) return null;
  return [Math.round(pt[0] * 10) / 10, Math.round(pt[1] * 10) / 10];
}

/**
 * Generates an SVG path data string ("M ... Z") for any GeoJSON feature or geometry.
 */
export function generateGeoPath(
  object: GeoPermissibleObjects = karnatakaGeoJson as unknown as GeoPermissibleObjects,
  projection: GeoProjection = defaultKarnatakaProjection
): string {
  const pathGenerator = geoPath().projection(projection);
  return pathGenerator(object) ?? "";
}

/**
 * Returns the pre-computed SVG path string for Karnataka's state boundary.
 */
export function getKarnatakaBoundaryPath(): string {
  return generateGeoPath();
}

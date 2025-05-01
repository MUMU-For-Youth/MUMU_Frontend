export interface ApiSpaceResponse {
  spaceId: string;
  spaceType: string;
  spaceName: string;
  spaceTime: string;
  spaceTarget: string;
  spaceLocation: string;
  contactNumber: string;
  spaceUrl: string;
  bookmarked: boolean;
}

export interface ApiEduResponse {
  eduId: number;
  field: string;
  eduName: string;
  eduDate: string;
  eduMethod: string;
  eduAddress: string;
  eduSchedule: string;
  eduTarget: string;
  eduUrl: string;
  bookmarked: boolean;
}

export interface ApiSpaceMarkerResponse {
  spaceId: string;
  spaceName: string;
  spaceLocation: string;
  spaceLocationLongitude: number;
  spaceLocationLatitude: number;
  spaceImage: string;
}

export interface ApiEduMarkerResponse {
  eduId: number;
  eduName: string;
  eduLocationName: string;
  eduAddress: string;
  eduLocationLongitude: number;
  eduLocationLatitude: number;
  eduImage: string;
}

export interface EduWithMarker extends ApiEduResponse {
  lat: number;
  lng: number;
}

export interface SpaceWithMarker extends ApiSpaceResponse {
  lat: number;
  lng: number;
}

import { useMemo } from "react"

export function useFragmentImage(id) {
  
  const successImage = useMemo(() => {
    const cdn = 'https://fragments.nyc3.cdn.digitaloceanspaces.com/'
    let panelId = 'A1'
    
    if (id <= 85) {
      panelId = 'A1'
    } else if (id > 85 && id <= 223) {
      panelId = 'A3'
    } else if (id > 223 && id <= 318) {
      panelId = 'B1'
    } else if (id > 318 && id <= 476) {
      panelId = 'B2'
    } else if (id > 476 && id <= 627) {
      panelId = 'B3'
    } else if (id > 627 && id <= 773) {
      panelId = 'C1'
    } else if (id > 773 && id <= 889) {
      panelId = 'C2'
    } else if (id > 889 && id <= 1027) {
      panelId = 'C3'
    } else if (id > 1027 && id <= 1205) {
      panelId = 'D1'
    } else if (id > 1205 && id <= 1370) {
      panelId = 'D2'
    } else if (id > 1370 && id <= 1532) {
      panelId = 'D3'
    } else if (id > 1532 && id <= 1713) {
      panelId = 'E1'
    } else if (id > 1713 && id <= 1870) {
      panelId = 'E2'
    } else if (id > 1870 && id <= 2034) {
      panelId = 'E3'
    } else if (id > 2034 && id <= 2228) {
      panelId = 'U1'
    } else if (id > 2228 && id <= 2374) {
      panelId = 'U2'
    } else if (id > 2374 && id <= 2588) {
      panelId = 'U3'
    } else if (id > 2588 && id <= 2733) {
      panelId = 'U4'
    } else if (id > 2733 && id <= 2899) {
      panelId = 'U5'
    } else if (id > 2899 && id <= 3051) {
      panelId = 'V1'
    } else if (id > 3051 && id <= 3190) {
      panelId = 'V2'
    } else if (id > 3190 && id <= 3277) {
      panelId = 'V3'
    } else if (id > 3277 && id <= 3376) {
      panelId = 'V4'
    } else if (id > 3376 && id <= 3522) {
      panelId = 'V5'
    } else if (id > 3522 && id <= 3716) {
      panelId = 'W1'
    } else if (id > 3716 && id <= 3881) {
      panelId = 'W2'
    } else if (id > 3881 && id <= 4060) {
      panelId = 'W3'
    } else if (id > 4060 && id <= 4242) {
      panelId = 'W4'
    } else if (id > 4242 && id <= 4432) {
      panelId = 'W5'
    } else if (id > 4432 && id <= 4593) {
      panelId = 'X1'
    } else if (id > 4593 && id <= 4761) {
      panelId = 'X2'
    } else if (id > 4761 && id <= 4886) {
      panelId = 'X3'
    } else if (id > 4886 && id <= 5040) {
      panelId = 'X4'
    } else if (id > 5040 && id <= 5219) {
      panelId = 'X5'
    } else if (id > 5219 && id <= 5368) {
      panelId = 'Y1'
    } else if (id > 5368 && id <= 5528) {
      panelId = 'Y2'
    } else if (id > 5528 && id <= 5647) {
      panelId = 'Y3'
    } else if (id > 5647 && id <= 5824) {
      panelId = 'Y4'
    } else if (id > 5824 && id <= 6014) {
      panelId = 'Y5'
    } else if (id > 6014 && id <= 6162) {
      panelId = 'Z1'
    } else if (id > 6162 && id <= 6372) {
      panelId = 'Z2'
    } else if (id > 6372 && id <= 6559) {
      panelId = 'Z3'
    } else if (id > 6559 && id <= 6756) {
      panelId = 'Z4'
    } else if (id > 6756) {
      panelId = 'Z5'
    }
  
    return {
      panel: `${cdn}/panels/${panelId}.jpg`,
      fragment: `${cdn}fragments/${panelId}.${id}.jpg`
    }
  }, [])

  return successImage

}
import lazyload from "@/utils/lazyload";
import { isArray } from "lodash";

export function getFlattenRoutes(routes) {
  const mod = import.meta.glob('../pages/**/[a-z[]*.tsx')
  const res = []
  function travel(_routes) {
    _routes.forEach((route) => {
      const visibleChildren = (route.children || []).filter(
        (child) => !child.ignore,
      )
      if (route.key && (!route.children || !visibleChildren.length)) {
        try {
          route.component = lazyload(mod[`../pages/${route.key}/index.tsx`])
          res.push(route)
        } catch (e) {
          console.log(route.key)
          console.error(e)
        }
      }

      if (isArray(route.children) && route.children.length) {
        travel(route.children)
      }
    })
  }
  travel(routes)
  return res
}
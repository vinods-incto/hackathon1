import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DashboardCards() {
  return (
    <div
      className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription> Feature 1</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Exportable Data
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              PDF, CSV, Excel
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
              Aimed at Intuitive UX
             <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            PDF, CSV, Excel
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Feature 2</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Filtering & Sorting
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Temporal & Categorical
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
          Data Filtering with Minimal user strain <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
          Flexible support for multiple data types
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Feature 3</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Periodic Updates
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
                Real-time & Scheduled
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
             Prescheduling for future data
             <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Feature 4</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              Manual Data Entry when Role has previleges
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Flexible yet Secure
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
        Only for Admins and Managers
         <IconTrendingUp className="size-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

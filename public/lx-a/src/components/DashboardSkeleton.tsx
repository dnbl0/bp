import { Skeleton } from "./Skeleton";

function CardSkeleton() {
  return (
    <div className="skelcard">
      <Skeleton className="skelcard__media" height="100%" radius={0} />
      <div className="skelcard__body">
        <Skeleton width="45%" height={12} />
        <Skeleton width="100%" height={10} />
        <Skeleton width="85%" height={10} />
        <Skeleton width="38%" height={10} />
      </div>
    </div>
  );
}

/** Loading placeholder that mirrors the authenticated dashboard layout. */
export function DashboardSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading your dashboard">
      {/* Hero */}
      <div className="hero skelhero">
        <div className="shell hero__content">
          <Skeleton width={150} height={12} />
          <Skeleton width={300} height={44} radius={6} style={{ marginTop: 18 }} />
        </div>
      </div>

      {/* Body */}
      <div className="shell dash">
        <div className="dash__main">
          {[0, 1].map((s) => (
            <section key={s}>
              <div className="section-head">
                <Skeleton width={170} height={14} />
                <Skeleton width={90} height={11} />
              </div>
              <div className="benefits__grid">
                {[0, 1, 2].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="dash__side">
          <div className="skelpanel">
            <Skeleton width={120} height={12} />
            <Skeleton className="skelpanel__card" />
            <Skeleton className="skelpanel__strip" />
          </div>
        </div>
      </div>
    </div>
  );
}

import LeadItem from '@/components/LeadItem';

export default function LeadList({ leads }) {
  return (
    <ul className="space-y-4">
      {leads.length > 0 ? (
        leads.map((lead) => <LeadItem key={lead._id} lead={lead} />)
      ) : (
        <p className="text-gray-500 text-center">No leads found.</p>
      )}
    </ul>
  );
}
